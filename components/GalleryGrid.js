'use client';

import { useState, useEffect } from 'react';
import ImageModal from './ImageModal';
import { proxyUrl } from '@/lib/proxy-image';

function prevent(e) {
  e.preventDefault();
  e.stopPropagation();
}

export default function GalleryGrid({ fotos = [] }) {
  const [modalIndex, setModalIndex] = useState(null);
  const [loaded, setLoaded] = useState({});

  useEffect(() => {
    function noSave(e) {
      if ((e.ctrlKey || e.metaKey) && (e.key === 's' || e.key === 'S')) {
        e.preventDefault();
      }
    }
    document.addEventListener('keydown', noSave);
    return () => document.removeEventListener('keydown', noSave);
  }, []);

  if (!fotos.length) {
    return (
      <p
        style={{
          textAlign: 'center',
          color: 'var(--text-muted)',
          fontFamily: 'var(--font-body)',
          fontSize: '14px',
          letterSpacing: '0.08em',
          padding: '4rem 0',
        }}
      >
        Próximamente.
      </p>
    );
  }

  const modalSrc =
    modalIndex !== null
      ? proxyUrl(fotos[modalIndex].imagen, { width: 1200, quality: 82 })
      : null;

  return (
    <>
      <div className="gallery-columns">
        {fotos.map((foto, i) => {
          const thumbUrl = proxyUrl(foto.imagen, { width: 900, quality: 80 });
          return (
            <div
              key={foto._id}
              className="gallery-item fade-up"
              style={{ animationDelay: `${Math.min(i * 0.04, 0.6)}s`, opacity: 0 }}
              onClick={() => setModalIndex(i)}
              onContextMenu={prevent}
              onDragStart={prevent}
              role="button"
              tabIndex={0}
              aria-label={foto.alt || foto.titulo || `Foto ${i + 1}`}
              onKeyDown={(e) => e.key === 'Enter' && setModalIndex(i)}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={thumbUrl}
                alt={foto.alt || foto.titulo || ''}
                loading="lazy"
                draggable={false}
                onContextMenu={prevent}
                onDragStart={prevent}
                onLoad={() => setLoaded((prev) => ({ ...prev, [foto._id]: true }))}
                style={{
                  opacity: loaded[foto._id] ? 1 : 0,
                  transition: 'opacity 0.4s ease, transform 0.5s cubic-bezier(0.25,0.46,0.45,0.94), filter 0.5s ease',
                }}
              />
            </div>
          );
        })}
      </div>

      {modalIndex !== null && (
        <ImageModal
          src={modalSrc}
          alt={fotos[modalIndex]?.alt || fotos[modalIndex]?.titulo || ''}
          onClose={() => setModalIndex(null)}
          onPrev={() => setModalIndex((i) => Math.max(0, i - 1))}
          onNext={() => setModalIndex((i) => Math.min(fotos.length - 1, i + 1))}
          hasPrev={modalIndex > 0}
          hasNext={modalIndex < fotos.length - 1}
        />
      )}
    </>
  );
}
