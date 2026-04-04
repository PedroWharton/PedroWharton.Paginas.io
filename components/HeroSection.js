'use client';

import Link from 'next/link';

function prevent(e) {
  e.preventDefault();
}

export default function HeroSection({ heroUrl, categorias = [] }) {
  return (
    <section
      style={{
        position: 'relative',
        height: '100dvh',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      onContextMenu={prevent}
    >
      {/* Background image */}
      {heroUrl ? (
        <div
          className="hero-image-wrap"
          style={{
            position: 'absolute',
            inset: '-5%',
            backgroundImage: `url(${heroUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            zIndex: 0,
          }}
        />
      ) : (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(135deg, #0f0e0c 0%, #1a1815 100%)',
            zIndex: 0,
          }}
        />
      )}

      {/* Dark overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.55) 60%, rgba(0,0,0,0.75) 100%)',
          zIndex: 1,
        }}
      />

      {/* Hero text */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          textAlign: 'center',
          padding: '0 1.5rem',
        }}
      >
        <h1
          className="fade-up fade-up-delay-1"
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 300,
            fontSize: 'clamp(3.5rem, 10vw, 9rem)',
            letterSpacing: '0.04em',
            color: 'var(--text)',
            lineHeight: 0.9,
            opacity: 0,
          }}
        >
          CECILIA BREIN
        </h1>

        <div
          className="fade-up fade-up-delay-2"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1rem',
            marginTop: '1.5rem',
            opacity: 0,
          }}
        >
          <span
            style={{
              display: 'block',
              height: '1px',
              width: '32px',
              background: 'var(--accent)',
            }}
          />
          <span
            style={{
              fontFamily: 'var(--font-body)',
              fontWeight: 300,
              fontSize: '11px',
              letterSpacing: '0.28em',
              textTransform: 'uppercase',
              color: 'var(--accent)',
            }}
          >
            Fotografía
          </span>
          <span
            style={{
              display: 'block',
              height: '1px',
              width: '32px',
              background: 'var(--accent)',
            }}
          />
        </div>
      </div>

      {/* Category nav at bottom */}
      {categorias.length > 0 && (
        <nav
          className="fade-up fade-up-delay-4"
          style={{
            position: 'absolute',
            bottom: '2.5rem',
            left: 0,
            right: 0,
            zIndex: 2,
            display: 'flex',
            justifyContent: 'center',
            gap: 'clamp(1rem, 3vw, 2.5rem)',
            flexWrap: 'wrap',
            padding: '0 1.5rem',
            opacity: 0,
          }}
        >
          {categorias.map((cat) => (
            <Link
              key={cat._id}
              href={`/galeria/${cat.slug}`}
              className="hero-cat-link"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '10px',
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: 'rgba(237,232,225,0.6)',
                textDecoration: 'none',
                transition: 'color 0.2s',
              }}
            >
              {cat.nombre}
            </Link>
          ))}
        </nav>
      )}
    </section>
  );
}
