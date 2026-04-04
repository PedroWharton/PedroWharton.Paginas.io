import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getCategorias } from '@/lib/sanity.queries';

export const metadata = {
  title: 'Cecilia Brein — Fotografía',
  description: 'Fotografía de paisajes, flores, retratos y más por Cecilia Brein.',
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    title: 'Cecilia Brein — Fotografía',
    description: 'Fotografía de paisajes, flores, retratos y más por Cecilia Brein.',
    type: 'website',
    url: 'https://ceciliabrein.com',
  },
};

export default async function RootLayout({ children }) {
  const categorias = await getCategorias().catch(() => []);

  return (
    <html lang="es">
      <body className="grain">
        <Header categorias={categorias} />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
