/**
 * Canonical site origin. Set VITE_SITE_URL when deploying somewhere other
 * than the default domain so canonical URLs, Open Graph URLs and the
 * generated sitemap all point at the real host.
 */
export const SITE_URL = (import.meta.env.VITE_SITE_URL || "https://dev-essentials-hub.vercel.app").replace(
  /\/+$/,
  ""
);
export const SITE_NAME = "DevToolbox";
