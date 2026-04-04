import { defineType, defineField } from 'sanity';

export const categoriaSchema = defineType({
  name: 'categoria',
  title: 'Categoría',
  type: 'document',
  fields: [
    defineField({
      name: 'nombre',
      title: 'Nombre',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      options: {
        source: 'nombre',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'descripcion',
      title: 'Descripción',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'imagenPortada',
      title: 'Imagen de Portada',
      type: 'image',
      description: 'Imagen que aparece en la página principal como preview de esta categoría.',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'orden',
      title: 'Orden en el menú',
      type: 'number',
      description: 'Número menor aparece primero (ej: 1, 2, 3…)',
    }),
  ],
  orderings: [
    {
      title: 'Orden de menú',
      name: 'menuOrden',
      by: [{ field: 'orden', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'nombre',
      media: 'imagenPortada',
      orden: 'orden',
    },
    prepare({ title, media, orden }) {
      return { title: `${orden ? orden + '. ' : ''}${title}`, media };
    },
  },
});
