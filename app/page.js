import HeroSection from '@/components/HeroSection';
import CategoryGrid from '@/components/CategoryGrid';
import { getConfiguracion, getCategorias } from '@/lib/sanity.queries';
import { proxyUrl } from '@/lib/proxy-image';

export const revalidate = 60;

export default async function HomePage() {
  const [config, categorias] = await Promise.all([
    getConfiguracion().catch(() => null),
    getCategorias().catch(() => []),
  ]);

  const heroUrl = config?.imagenHero
    ? proxyUrl(config.imagenHero, { width: 2400, quality: 85 })
    : null;

  return (
    <>
      <HeroSection heroUrl={heroUrl} categorias={categorias} />
      <CategoryGrid categorias={categorias} />
    </>
  );
}
