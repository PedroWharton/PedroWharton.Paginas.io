/**
 * Migration script: uploads all local images to Sanity.
 * Run with: node scripts/migrate-images.mjs
 *
 * Requires in .env.local:
 *   NEXT_PUBLIC_SANITY_PROJECT_ID=...
 *   NEXT_PUBLIC_SANITY_DATASET=production
 *   SANITY_TOKEN=...  (Editor token from sanity.io/manage)
 */

import { createClient } from '@sanity/client';
import { readFileSync, readdirSync, existsSync } from 'fs';
import { join, extname, resolve } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// --- Load .env.local manually (no dotenv dependency needed) ---
const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');

function loadEnv() {
  const envPath = join(ROOT, '.env.local');
  if (!existsSync(envPath)) {
    console.error('❌  .env.local not found');
    process.exit(1);
  }
  const lines = readFileSync(envPath, 'utf8').split('\n');
  for (const line of lines) {
    const [key, ...rest] = line.split('=');
    if (key && rest.length) process.env[key.trim()] = rest.join('=').trim();
  }
}

loadEnv();

const PROJECT_ID = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const DATASET    = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const TOKEN      = process.env.SANITY_TOKEN;

if (!PROJECT_ID || !TOKEN) {
  console.error('❌  Missing NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_TOKEN in .env.local');
  process.exit(1);
}

const client = createClient({
  projectId: PROJECT_ID,
  dataset:   DATASET,
  apiVersion: '2024-01-01',
  token:      TOKEN,
  useCdn:     false,
});

// --- Category mapping: folder name → display name, slug, order ---
const CATEGORIES = [
  { folder: 'Paisajes_1080',    nombre: 'Paisajes',        slug: 'paisajes',       orden: 1 },
  { folder: '1080px_Flores',    nombre: 'Flores',          slug: 'flores',         orden: 2 },
  { folder: 'B&W_1080px',       nombre: 'Blanco y Negro',  slug: 'blanco-y-negro', orden: 3 },
  { folder: '1080px_Ciudades',  nombre: 'Ciudades',        slug: 'ciudades',       orden: 4 },
  { folder: '1080px_Retratos',  nombre: 'Retratos',        slug: 'retratos',       orden: 5 },
];

const IMAGE_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.gif']);
const IMAGES_DIR = join(ROOT, 'images');

// --- Helpers ---
async function upsertCategory(cat) {
  const existing = await client.fetch(
    `*[_type == "categoria" && slug.current == $slug][0]._id`,
    { slug: cat.slug }
  );
  if (existing) {
    console.log(`  ↩  Category already exists: ${cat.nombre}`);
    return existing;
  }
  const doc = await client.create({
    _type: 'categoria',
    nombre: cat.nombre,
    slug: { _type: 'slug', current: cat.slug },
    orden: cat.orden,
  });
  console.log(`  ✓  Created category: ${cat.nombre} (${doc._id})`);
  return doc._id;
}

async function imageAlreadyUploaded(filename, categoriaId) {
  const result = await client.fetch(
    `*[_type == "foto" && categoria._ref == $cat && titulo == $titulo][0]._id`,
    { cat: categoriaId, titulo: filename }
  );
  return !!result;
}

async function uploadImage(filePath, filename, categoriaId, orden) {
  const buffer = readFileSync(filePath);
  const ext = extname(filename).toLowerCase().replace('.', '');
  const mimeType = ext === 'jpg' || ext === 'jpeg' ? 'image/jpeg'
                 : ext === 'png'  ? 'image/png'
                 : ext === 'webp' ? 'image/webp'
                 : 'image/jpeg';

  // Upload the file as a Sanity asset
  const asset = await client.assets.upload('image', buffer, {
    filename,
    contentType: mimeType,
  });

  // Create the foto document
  await client.create({
    _type: 'foto',
    titulo: filename,
    imagen: {
      _type: 'image',
      asset: { _type: 'reference', _ref: asset._id },
    },
    alt: filename.replace(/\.[^.]+$/, '').replace(/[-_]/g, ' '),
    categoria: { _type: 'reference', _ref: categoriaId },
    destacada: false,
    orden,
  });
}

// --- Main ---
async function main() {
  console.log(`\n🚀  Starting migration to Sanity (project: ${PROJECT_ID}, dataset: ${DATASET})\n`);

  for (const cat of CATEGORIES) {
    const folderPath = join(IMAGES_DIR, cat.folder);

    if (!existsSync(folderPath)) {
      console.log(`⚠️   Folder not found, skipping: ${cat.folder}`);
      continue;
    }

    console.log(`\n📁  ${cat.nombre} (${cat.folder})`);

    const categoriaId = await upsertCategory(cat);

    const files = readdirSync(folderPath)
      .filter((f) => IMAGE_EXTENSIONS.has(extname(f).toLowerCase()))
      .sort();

    console.log(`     ${files.length} images found`);

    let uploaded = 0;
    let skipped  = 0;

    for (let i = 0; i < files.length; i++) {
      const filename = files[i];
      const filePath = join(folderPath, filename);

      const alreadyDone = await imageAlreadyUploaded(filename, categoriaId);
      if (alreadyDone) {
        process.stdout.write(`  ↩  [${i + 1}/${files.length}] Already uploaded: ${filename}\n`);
        skipped++;
        continue;
      }

      try {
        await uploadImage(filePath, filename, categoriaId, i + 1);
        process.stdout.write(`  ✓  [${i + 1}/${files.length}] ${filename}\n`);
        uploaded++;
      } catch (err) {
        process.stdout.write(`  ✗  [${i + 1}/${files.length}] FAILED: ${filename} — ${err.message}\n`);
      }
    }

    console.log(`     → ${uploaded} uploaded, ${skipped} skipped`);
  }

  console.log('\n✅  Migration complete!\n');
}

main().catch((err) => {
  console.error('\n❌  Fatal error:', err.message);
  process.exit(1);
});
