import { PortableText } from 'next-sanity';
import { getConfiguracion } from '@/lib/sanity.queries';
import { urlFor } from '@/lib/sanity.image';
import ContactLinks from '@/components/ContactLinks';

export const revalidate = 60;

export const metadata = {
  title: 'Contacto — Cecilia Brein',
  description: 'Contacto y biografía de Cecilia Brein, fotógrafa.',
};

const portableComponents = {
  block: {
    normal: ({ children }) => (
      <p style={{ marginBottom: '1.25rem' }}>{children}</p>
    ),
  },
};

export default async function ContactoPage() {
  const config = await getConfiguracion().catch(() => null);

  const profileUrl = config?.fotoPerfil
    ? urlFor(config.fotoPerfil).width(800).height(1000).fit('crop').quality(85).url()
    : null;

  return (
    <div
      style={{
        paddingTop: '120px',
        paddingBottom: '6rem',
        paddingLeft: 'clamp(1.5rem, 5vw, 4rem)',
        paddingRight: 'clamp(1.5rem, 5vw, 4rem)',
        minHeight: '100vh',
      }}
    >
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
        Acerca de
      </p>
      <h1 className="page-title" style={{ marginBottom: '3rem' }}>
        Contacto
      </h1>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 'clamp(3rem, 6vw, 6rem)',
          alignItems: 'start',
          maxWidth: '960px',
        }}
      >
        {/* Profile photo */}
        {profileUrl && (
          <ContactLinks profileUrl={profileUrl} email={null} instagram={null} showPhotoOnly />
        )}

        {/* Bio and links */}
        <div>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontStyle: 'italic',
              fontWeight: 300,
              fontSize: '2rem',
              color: 'var(--text)',
              marginBottom: '0.5rem',
              lineHeight: 1.1,
            }}
          >
            Cecilia Brein
          </h2>
          <span className="accent-line" />

          {config?.bio ? (
            <div className="bio-text">
              <PortableText value={config.bio} components={portableComponents} />
            </div>
          ) : (
            <p className="bio-text">Fotógrafa argentina.</p>
          )}

          <ContactLinks
            profileUrl={null}
            email={config?.email || null}
            instagram={config?.instagram || null}
          />
        </div>
      </div>
    </div>
  );
}
