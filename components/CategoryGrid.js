'use client';

import Link from 'next/link';
import { urlFor } from '@/lib/sanity.image';

function prevent(e) {
  e.preventDefault();
}

export default function CategoryGrid({ categorias = [] }) {
  if (!categorias.length) return null;

  return (
    <section
      style={{
        padding: 'clamp(4rem, 8vw, 7rem) clamp(1.5rem, 5vw, 4rem)',
      }}
    >
      <p
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '10px',
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color: 'var(--text-muted)',
          marginBottom: '3rem',
        }}
      >
        Galería
      </p>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '2px',
        }}
      >
        {categorias.map((cat) => {
          const coverUrl = cat.imagenPortada
            ? urlFor(cat.imagenPortada).width(800).height(600).fit('crop').quality(80).url()
            : null;

          return (
            <Link
              key={cat._id}
              href={`/galeria/${cat.slug}`}
              className="cat-card"
              style={{
                display: 'block',
                position: 'relative',
                aspectRatio: '4/3',
                overflow: 'hidden',
                background: 'var(--surface)',
                textDecoration: 'none',
              }}
            >
              {coverUrl && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={coverUrl}
                  alt={cat.nombre}
                  draggable={false}
                  onContextMenu={prevent}
                  className="cat-card-img"
                  style={{
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition:
                      'transform 0.6s cubic-bezier(0.25,0.46,0.45,0.94), filter 0.6s ease',
                    filter: 'brightness(0.7)',
                    pointerEvents: 'none',
                  }}
                />
              )}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  justifyContent: 'flex-end',
                  padding: '1.5rem',
                  background: coverUrl
                    ? 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 60%)'
                    : 'var(--surface)',
                  transition: 'background 0.4s ease',
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontStyle: 'italic',
                    fontWeight: 300,
                    fontSize: '1.6rem',
                    color: 'var(--text)',
                    lineHeight: 1,
                    pointerEvents: 'none',
                  }}
                >
                  {cat.nombre}
                </span>
                {cat.descripcion && (
                  <span
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '11px',
                      color: 'var(--text-muted)',
                      marginTop: '0.35rem',
                      letterSpacing: '0.04em',
                      pointerEvents: 'none',
                    }}
                  >
                    {cat.descripcion}
                  </span>
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
