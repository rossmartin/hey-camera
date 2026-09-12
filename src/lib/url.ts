/**
 * Prefix a site-root path with Astro's configured `base`, so links keep working
 * whether the site is served from a GitHub Pages subpath or a custom domain.
 */
export function withBase(path: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const suffix = path.startsWith('/') ? path : `/${path}`;
  return `${base}${suffix}` || '/';
}

export const APP_STORE_URL =
  'https://apps.apple.com/us/app/hey-camera/id1271273970';
export const SUPPORT_EMAIL = 'support@heycamera.app';
