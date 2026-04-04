'use client';

import { useEffect, useCallback } from 'react';

export default function ImageModal({ src, alt, onClose, onPrev, onNext, hasPrev, hasNext }) {
  const handleKey = useCallback(
    (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight' && hasNext) onNext();
      if (e.key === 'ArrowLeft' && hasPrev) onPrev();
    },
    [onClose, onNext, onPrev, hasPrev, hasNext]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [handleKey]);

  function prevent(e) {
    e.preventDefault();
    e.stopPropagation();
  }

  return (
    <div
      className="modal-overlay"
      onClick={onClose}
      onContextMenu={prevent}
    >
      {/* Close */}
      <button
        onClick={onClose}
        style={{
          position: 'absolute',
          top: '1.5rem',
          right: '1.5rem',
          background: 'none',
          border: 'none',
          color: 'var(--text-muted)',
          fontSize: '1.5rem',
          cursor: 'pointer',
          lineHeight: 1,
          padding: '0.5rem',
          transition: 'color 0.2s',
          zIndex: 10,
          pointerEvents: 'auto',
        }}
        onMouseEnter={(e) => (e.target.style.color = 'var(--text)')}
        onMouseLeave={(e) => (e.target.style.color = 'var(--text-muted)')}
        aria-label="Cerrar"
      >
        ×
      </button>

      {/* Prev */}
      {hasPrev && (
        <button
          onClick={(e) => { e.stopPropagation(); onPrev(); }}
          style={{
            position: 'absolute',
            left: '1.5rem',
            top: '50%',
            transform: 'translateY(-50%)',
            background: 'none',
            border: 'none',
            color: 'var(--text-muted)',
            fontSize: '1.8rem',
            cursor: 'pointer',
            padding: '1rem',
            transition: 'color 0.2s',
            zIndex: 10,
            pointerEvents: 'auto',
            lineHeight: 1,
          }}
          onMouseEnter={(e) => (e.target.style.color = 'var(--text)')}
          onMouseLeave={(e) => (e.target.style.color = 'var(--text-muted)')}
          aria-label="Anterior"
        >
          ‹
        </button>
      )}

      {/* Next */}
      {hasNext && (
        <button
          onClick={(e) => { e.stopPropagation(); onNext(); }}
          style={{
            position: 'absolute',
            right: '1.5rem',
            top: '50%',
            transform: 'translateY(-50%)',
            background: 'none',
            border: 'none',
            color: 'var(--text-muted)',
            fontSize: '1.8rem',
            cursor: 'pointer',
            padding: '1rem',
            transition: 'color 0.2s',
            zIndex: 10,
            pointerEvents: 'auto',
            lineHeight: 1,
          }}
          onMouseEnter={(e) => (e.target.style.color = 'var(--text)')}
          onMouseLeave={(e) => (e.target.style.color = 'var(--text-muted)')}
          aria-label="Siguiente"
        >
          ›
        </button>
      )}

      {/* Watermark */}
      <span className="modal-watermark">© Cecilia Brein</span>

      {/* Image */}
      <div
        onClick={(e) => e.stopPropagation()}
        onContextMenu={prevent}
        onDragStart={prevent}
        style={{ pointerEvents: 'auto', userSelect: 'none' }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt || ''}
          className="modal-img"
          draggable={false}
          onContextMenu={prevent}
          onDragStart={prevent}
        />
      </div>
    </div>
  );
}
