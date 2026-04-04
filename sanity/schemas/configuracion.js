import { defineType, defineField } from 'sanity';

export const configuracionSchema = defineType({
  name: 'configuracion',
  title: 'Configuración del Sitio',
  type: 'document',
  fields: [
    defineField({
      name: 'imagenHero',
      title: 'Imagen Principal (Hero)',
      type: 'image',
      description: 'Foto que se muestra en la pantalla de inicio a pantalla completa.',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'fotoPerfil',
      title: 'Foto de Perfil',
      type: 'image',
      description: 'Foto que aparece en la página de contacto.',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'bio',
      title: 'Biografía',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'Texto de presentación que aparece en la página de contacto.',
    }),
    defineField({
      name: 'email',
      title: 'Email de Contacto',
      type: 'string',
    }),
    defineField({
      name: 'instagram',
      title: 'Usuario de Instagram',
      type: 'string',
      description: 'Solo el usuario, sin el @. Ej: ceciliabreinfotografia',
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Configuración del Sitio' };
    },
  },
});
