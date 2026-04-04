/**
 * Returns a proxied image URL that routes through /api/image
 * instead of exposing the Sanity CDN URL directly.
 */
export function proxyUrl(sanityImage, { width = 900, quality = 80 } = {}) {
  const ref = sanityImage?.asset?._ref;
  if (!ref) return null;
  return `/api/image?ref=${encodeURIComponent(ref)}&w=${width}&q=${quality}`;
}
