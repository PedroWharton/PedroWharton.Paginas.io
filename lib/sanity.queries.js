import { sanityClient } from './sanity.client';

export async function getConfiguracion() {
  return sanityClient.fetch(
    `*[_type == "configuracion" && _id == "siteConfig"][0]{
      imagenHero,
      fotoPerfil,
      bio,
      email,
      instagram
    }`,
    {},
    { next: { revalidate: 60 } }
  );
}

export async function getCategorias() {
  return sanityClient.fetch(
    `*[_type == "categoria"] | order(orden asc){
      _id,
      nombre,
      "slug": slug.current,
      descripcion,
      imagenPortada,
      orden
    }`,
    {},
    { next: { revalidate: 60 } }
  );
}

export async function getCategoriaBySlug(slug) {
  return sanityClient.fetch(
    `*[_type == "categoria" && slug.current == $slug][0]{
      _id,
      nombre,
      "slug": slug.current,
      descripcion,
      imagenPortada
    }`,
    { slug },
    { next: { revalidate: 60 } }
  );
}

export async function getFotosByCategoria(categoriaId) {
  return sanityClient.fetch(
    `*[_type == "foto" && categoria._ref == $categoriaId] | order(orderRank asc, _createdAt asc){
      _id,
      titulo,
      imagen,
      alt,
      orden,
      destacada
    }`,
    { categoriaId },
    { next: { revalidate: 60 } }
  );
}

export async function getFotosDestacadas() {
  return sanityClient.fetch(
    `*[_type == "foto" && destacada == true] | order(_createdAt desc)[0...12]{
      _id,
      titulo,
      imagen,
      alt,
      "categoria": categoria->{ nombre, "slug": slug.current }
    }`,
    {},
    { next: { revalidate: 60 } }
  );
}

export async function getAllCategoriaSlugs() {
  return sanityClient.fetch(
    `*[_type == "categoria"]{ "slug": slug.current }`,
    {},
    { next: { revalidate: 3600 } }
  );
}
