export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      style={{
        borderTop: '1px solid var(--border)',
        padding: '2rem 1.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem',
      }}
    >
      <span
        style={{
          fontFamily: 'var(--font-display)',
          fontStyle: 'italic',
          fontWeight: 300,
          fontSize: '1rem',
          color: 'var(--text-muted)',
        }}
      >
        Cecilia Brein
      </span>
      <span
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '11px',
          letterSpacing: '0.12em',
          color: 'var(--border)',
          textTransform: 'uppercase',
        }}
      >
        © {year} — Todos los derechos reservados
      </span>
    </footer>
  );
}
