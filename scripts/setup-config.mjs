/**
 * Sets up:
 *  - Cover image for each category (uses first uploaded foto in that category)
 *  - Hero image for the home page (first Paisajes photo)
 *  - Profile photo for the contact page
 *  - Email + Instagram in site config
 *
 * Run with: node scripts/setup-config.mjs
 */

import { createClient } from '@sanity/client';
import { readFileSync, existsSync } from 'fs';
import { join, resolve, extname, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');

function loadEnv() {
  const envPath = join(ROOT, '.env.local');
  if (!existsSync(envPath)) { console.error('❌  .env.local not found'); process.exit(1); }
  for (const line of readFileSync(envPath, 'utf8').split('\n')) {
    const [key, ...rest] = line.split('=');
    if (key && rest.length) process.env[key.trim()] = rest.join('=').trim();
  }
}

loadEnv();

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset:   process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  token:      process.env.SANITY_TOKEN,
  useCdn:     false,
});

async function uploadFile(filePath, filename) {
  const buffer = readFileSync(filePath);
  const ext = extname(filename).toLowerCase().replace('.', '');
  const mimeType = ext === 'png' ? 'image/png' : ext === 'webp' ? 'image/webp' : 'image/jpeg';
  return client.assets.upload('image', buffer, { filename, contentType: mimeType });
}

async function main() {
  console.log('\n🔧  Setting up site configuration...\n');

  // 1. Set cover image for each category
  const categories = await client.fetch(
    `*[_type == "categoria"] | order(orden asc){ _id, nombre, slug, imagenPortada }`
  );

  for (const cat of categories) {
    if (cat.imagenPortada) {
      console.log(`  ↩  ${cat.nombre} already has a cover image`);
      continue;
    }

    const firstFoto = await client.fetch(
      `*[_type == "foto" && categoria._ref == $id] | order(orden asc, _createdAt asc)[0]{ imagen }`,
      { id: cat._id }
    );

    if (!firstFoto?.imagen) {
      console.log(`  ⚠️   No photos found for ${cat.nombre}, skipping`);
      continue;
    }

    await client.patch(cat._id).set({ imagenPortada: firstFoto.imagen }).commit();
    console.log(`  ✓  Set cover image for: ${cat.nombre}`);
  }

  // 2. Upload profile photo
  const profilePath = join(ROOT, 'images', 'Foto de perfil_MG_0183_Silver_Crop.jpg');
  let profileAsset = null;

  if (existsSync(profilePath)) {
    console.log('\n  📷  Uploading profile photo...');
    profileAsset = await uploadFile(profilePath, 'foto-perfil-cecilia-brein.jpg');
    console.log('  ✓  Profile photo uploaded');
  } else {
    console.log('\n  ⚠️   Profile photo not found at images/Foto de perfil_MG_0183_Silver_Crop.jpg');
  }

  // 3. Pick a hero image (first Paisajes photo)
  const paisajesCategory = await client.fetch(
    `*[_type == "categoria" && slug.current == "paisajes"][0]._id`
  );
  let heroImage = null;
  if (paisajesCategory) {
    const heroFoto = await client.fetch(
      `*[_type == "foto" && categoria._ref == $id] | order(orden asc)[0]{ imagen }`,
      { id: paisajesCategory }
    );
    heroImage = heroFoto?.imagen || null;
  }

  // 4. Create or update the siteConfig document
  const existing = await client.fetch(`*[_type == "configuracion" && _id == "siteConfig"][0]._id`);

  const configData = {
    _type: 'configuracion',
    _id:   'siteConfig',
    email: 'ceciliabrein@hotmail.com',
    instagram: 'ceciliabreinfotografia',
    ...(heroImage    && { imagenHero: heroImage }),
    ...(profileAsset && {
      fotoPerfil: {
        _type: 'image',
        asset: { _type: 'reference', _ref: profileAsset._id },
      },
    }),
  };

  if (existing) {
    await client.patch('siteConfig').set(configData).commit();
    console.log('  ✓  Updated site config (hero + profile + contact info)');
  } else {
    await client.createOrReplace(configData);
    console.log('  ✓  Created site config (hero + profile + contact info)');
  }

  console.log('\n✅  Setup complete!\n');
}

main().catch((err) => {
  console.error('\n❌  Fatal error:', err.message);
  process.exit(1);
});
