import { defineType, defineField } from 'sanity';
import { orderRankField, orderRankOrdering } from '@sanity/orderable-document-list';

export const fotoSchema = defineType({
  name: 'foto',
  title: 'Foto',
  type: 'document',
  fields: [
    orderRankField({ type: 'foto' }),
    defineField({
      name: 'titulo',
      title: 'Título (opcional)',
      type: 'string',
      description: 'Título interno para identificar la foto. No se muestra al público.',
    }),
    defineField({
      name: 'imagen',
      title: 'Imagen',
      type: 'image',
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'alt',
      title: 'Texto alternativo',
      type: 'string',
      description: 'Descripción breve de la imagen (para accesibilidad y SEO).',
    }),
    defineField({
      name: 'categoria',
      title: 'Categoría',
      type: 'reference',
      to: [{ type: 'categoria' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'destacada',
      title: '¿Foto destacada?',
      type: 'boolean',
      description: 'Las fotos destacadas pueden aparecer en la página principal.',
      initialValue: false,
    }),
  ],
  orderings: [orderRankOrdering],
  preview: {
    select: {
      title: 'titulo',
      media: 'imagen',
      categoria: 'categoria.nombre',
    },
    prepare({ title, media, categoria }) {
      return {
        title: title || 'Sin título',
        subtitle: categoria || 'Sin categoría',
        media,
      };
    },
  },
});
