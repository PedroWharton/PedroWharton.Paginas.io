import { defineType, defineField } from 'sanity';

export const fotoSchema = defineType({
  name: 'foto',
  title: 'Foto',
  type: 'document',
  fields: [
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
      options: {
        hotspot: true,
      },
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
    defineField({
      name: 'orden',
      title: 'Orden dentro de la categoría',
      type: 'number',
      description: 'Número menor aparece primero. Deja en blanco para orden automático.',
    }),
  ],
  orderings: [
    {
      title: 'Orden manual',
      name: 'ordenManual',
      by: [{ field: 'orden', direction: 'asc' }],
    },
  ],
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
