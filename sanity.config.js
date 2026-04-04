import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { orderableDocumentListDeskItem } from '@sanity/orderable-document-list';
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
      structure: (S, context) =>
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
            S.divider(),
            S.listItem()
              .title('Fotos — Todas')
              .schemaType('foto')
              .child(
                orderableDocumentListDeskItem({
                  type: 'foto',
                  title: 'Todas las fotos',
                  S,
                  context,
                }).child
              ),
            S.divider(),
            S.listItem()
              .title('Fotos por Categoría')
              .child(
                S.list()
                  .title('Seleccionar categoría')
                  .items([
                    orderableDocumentListDeskItem({
                      type: 'foto',
                      id: 'orderable-foto-paisajes',
                      title: 'Paisajes',
                      filter: 'categoria->slug.current == "paisajes"',
                      S,
                      context,
                    }),
                    orderableDocumentListDeskItem({
                      type: 'foto',
                      id: 'orderable-foto-flores',
                      title: 'Flores',
                      filter: 'categoria->slug.current == "flores"',
                      S,
                      context,
                    }),
                    orderableDocumentListDeskItem({
                      type: 'foto',
                      id: 'orderable-foto-byn',
                      title: 'Blanco y Negro',
                      filter: 'categoria->slug.current == "blanco-y-negro"',
                      S,
                      context,
                    }),
                    orderableDocumentListDeskItem({
                      type: 'foto',
                      id: 'orderable-foto-ciudades',
                      title: 'Ciudades',
                      filter: 'categoria->slug.current == "ciudades"',
                      S,
                      context,
                    }),
                    orderableDocumentListDeskItem({
                      type: 'foto',
                      id: 'orderable-foto-retratos',
                      title: 'Retratos',
                      filter: 'categoria->slug.current == "retratos"',
                      S,
                      context,
                    }),
                  ])
              ),
          ]),
    }),
    visionTool(),
  ],
});
