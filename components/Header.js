'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

export default function Header({ categorias = [] }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const headerBg = isHome
    ? scrolled
      ? 'bg-black/80 backdrop-blur-md border-b border-[var(--border)]'
      : 'bg-transparent'
    : 'bg-black/90 backdrop-blur-md border-b border-[var(--border)]';

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${headerBg}`}
        style={{ height: '64px' }}
      >
        <div className="max-w-screen-xl mx-auto px-6 h-full flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0" style={{ pointerEvents: 'auto' }}>
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontStyle: 'italic',
                fontWeight: 300,
                fontSize: '1.35rem',
                color: 'var(--text)',
                letterSpacing: '0.02em',
                textDecoration: 'none',
              }}
            >
              Cecilia Brein
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8 header-nav">
            {categorias.map((cat) => (
              <Link
                key={cat._id}
                href={`/galeria/${cat.slug}`}
                className={pathname === `/galeria/${cat.slug}` ? 'active' : ''}
              >
                {cat.nombre}
              </Link>
            ))}
            <Link
              href="/contacto"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '11px',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: 'var(--accent)',
                textDecoration: 'none',
                transition: 'color 0.2s',
              }}
              onMouseEnter={(e) => (e.target.style.color = 'var(--accent-hover)')}
              onMouseLeave={(e) => (e.target.style.color = 'var(--accent)')}
            >
              Contacto
            </Link>
          </nav>

          {/* Hamburger */}
          <button
            className="md:hidden flex flex-col gap-[5px] p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menú"
            style={{ pointerEvents: 'auto', cursor: 'pointer', background: 'none', border: 'none' }}
          >
            <span
              style={{
                display: 'block',
                width: '22px',
                height: '1px',
                background: 'var(--text)',
                transition: 'transform 0.3s, opacity 0.3s',
                transform: menuOpen ? 'translateY(6px) rotate(45deg)' : 'none',
              }}
            />
            <span
              style={{
                display: 'block',
                width: '22px',
                height: '1px',
                background: 'var(--text)',
                transition: 'opacity 0.3s',
                opacity: menuOpen ? 0 : 1,
              }}
            />
            <span
              style={{
                display: 'block',
                width: '22px',
                height: '1px',
                background: 'var(--text)',
                transition: 'transform 0.3s, opacity 0.3s',
                transform: menuOpen ? 'translateY(-6px) rotate(-45deg)' : 'none',
              }}
            />
          </button>
        </div>
      </header>

      {/* Mobile menu */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 40,
          background: 'var(--bg)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '2.5rem',
          transition: 'opacity 0.3s, visibility 0.3s',
          opacity: menuOpen ? 1 : 0,
          visibility: menuOpen ? 'visible' : 'hidden',
          pointerEvents: menuOpen ? 'auto' : 'none',
        }}
      >
        {categorias.map((cat, i) => (
          <Link
            key={cat._id}
            href={`/galeria/${cat.slug}`}
            style={{
              fontFamily: 'var(--font-display)',
              fontStyle: 'italic',
              fontWeight: 300,
              fontSize: '2.2rem',
              color: pathname === `/galeria/${cat.slug}` ? 'var(--accent)' : 'var(--text)',
              textDecoration: 'none',
              transition: 'color 0.2s',
              animationDelay: `${i * 0.06}s`,
            }}
          >
            {cat.nombre}
          </Link>
        ))}
        <Link
          href="/contacto"
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '11px',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: 'var(--accent)',
            textDecoration: 'none',
            marginTop: '0.5rem',
          }}
        >
          Contacto
        </Link>
      </div>
    </>
  );
}
