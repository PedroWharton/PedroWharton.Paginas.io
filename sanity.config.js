import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './sanity/schemas';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  title: 'Cecilia Brein — Fotografía',
  schema: {
    types: schemaTypes,
  },
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Contenido')
          .items([
            S.listItem()
              .title('Configuración del Sitio')
              .id('configuracion')
              .child(
                S.document()
                  .schemaType('configuracion')
                  .documentId('siteConfig')
              ),
            S.divider(),
            S.listItem()
              .title('Categorías')
              .schemaType('categoria')
              .child(S.documentTypeList('categoria').title('Categorías')),
            S.listItem()
              .title('Fotos')
              .schemaType('foto')
              .child(S.documentTypeList('foto').title('Fotos')),
          ]),
    }),
    visionTool(),
  ],
});
