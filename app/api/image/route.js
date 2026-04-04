import { urlFor } from '@/lib/sanity.image';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const ref = searchParams.get('ref');
  const w   = parseInt(searchParams.get('w')  || '1200', 10);
  const q   = parseInt(searchParams.get('q')  || '80',   10);

  if (!ref) return new Response('Bad request', { status: 400 });

  const sanityUrl = urlFor({ _type: 'image', asset: { _type: 'reference', _ref: ref } })
    .width(w)
    .quality(q)
    .url();

  const upstream = await fetch(sanityUrl, { next: { revalidate: 86400 } });
  if (!upstream.ok) return new Response('Not found', { status: 404 });

  const buffer = await upstream.arrayBuffer();

  return new Response(buffer, {
    headers: {
      'Content-Type':  upstream.headers.get('content-type') || 'image/jpeg',
      'Cache-Control': 'public, max-age=86400',
    },
  });
}
