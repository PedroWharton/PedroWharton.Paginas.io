'use client';

function prevent(e) {
  e.preventDefault();
}

export default function ContactLinks({ profileUrl, email, instagram, showPhotoOnly = false }) {
  if (showPhotoOnly && profileUrl) {
    return (
      <div
        style={{
          position: 'relative',
          overflow: 'hidden',
          maxWidth: '420px',
        }}
        onContextMenu={prevent}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={profileUrl}
          alt="Cecilia Brein"
          draggable={false}
          onContextMenu={prevent}
          onDragStart={prevent}
          style={{
            width: '100%',
            height: 'auto',
            display: 'block',
            filter: 'grayscale(15%)',
            pointerEvents: 'none',
          }}
        />
      </div>
    );
  }

  if (!email && !instagram) return null;

  return (
    <div style={{ marginTop: '2.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {email && (
        <a
          href={`mailto:${email}`}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.75rem',
            fontFamily: 'var(--font-body)',
            fontSize: '13px',
            letterSpacing: '0.06em',
            color: 'var(--text-muted)',
            textDecoration: 'none',
            transition: 'color 0.2s',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text)')}
          onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
        >
          <span
            style={{
              fontSize: '10px',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'var(--accent)',
            }}
          >
            Email
          </span>
          {email}
        </a>
      )}

      {instagram && (
        <a
          href={`https://instagram.com/${instagram}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.75rem',
            fontFamily: 'var(--font-body)',
            fontSize: '13px',
            letterSpacing: '0.06em',
            color: 'var(--text-muted)',
            textDecoration: 'none',
            transition: 'color 0.2s',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text)')}
          onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
        >
          <span
            style={{
              fontSize: '10px',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'var(--accent)',
            }}
          >
            Instagram
          </span>
          @{instagram}
        </a>
      )}
    </div>
  );
}
