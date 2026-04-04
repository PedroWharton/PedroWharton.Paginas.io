import { notFound } from 'next/navigation';
import GalleryGrid from '@/components/GalleryGrid';
import { getCategoriaBySlug, getFotosByCategoria, getAllCategoriaSlugs } from '@/lib/sanity.queries';

export const revalidate = 60;

export async function generateStaticParams() {
  const slugs = await getAllCategoriaSlugs().catch(() => []);
  return slugs.map(({ slug }) => ({ categoria: slug }));
}

export async function generateMetadata({ params }) {
  const { categoria: slug } = await params;
  const cat = await getCategoriaBySlug(slug).catch(() => null);
  if (!cat) return { title: 'Galería — Cecilia Brein' };
  return {
    title: `${cat.nombre} — Cecilia Brein`,
    description: cat.descripcion || `Fotografías de ${cat.nombre} por Cecilia Brein.`,
  };
}

export default async function GaleriaPage({ params }) {
  const { categoria: slug } = await params;
  const categoria = await getCategoriaBySlug(slug).catch(() => null);
  if (!categoria) notFound();

  const fotos = await getFotosByCategoria(categoria._id).catch(() => []);

  return (
    <div
      style={{
        paddingTop: '120px',
        paddingBottom: '5rem',
        paddingLeft: 'clamp(1.5rem, 5vw, 4rem)',
        paddingRight: 'clamp(1.5rem, 5vw, 4rem)',
        minHeight: '100vh',
      }}
    >
      {/* Page header */}
      <header style={{ marginBottom: '3rem' }}>
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '10px',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: 'var(--text-muted)',
            marginBottom: '0.75rem',
          }}
        >
          Galería
        </p>
        <h1 className="page-title">{categoria.nombre}</h1>
        {categoria.descripcion && (
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '14px',
              color: 'var(--text-muted)',
              marginTop: '1rem',
              maxWidth: '480px',
              lineHeight: 1.7,
            }}
          >
            {categoria.descripcion}
          </p>
        )}
        <span
          style={{
            display: 'block',
            fontFamily: 'var(--font-body)',
            fontSize: '11px',
            letterSpacing: '0.1em',
            color: 'var(--border)',
            marginTop: '1.25rem',
          }}
        >
          {fotos.length} {fotos.length === 1 ? 'fotografía' : 'fotografías'}
        </span>
      </header>

      <GalleryGrid fotos={fotos} />
    </div>
  );
}
