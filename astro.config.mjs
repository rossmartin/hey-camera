// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// When a custom domain is added, change `site` to it and set `base` to '/'.
export default defineConfig({
  site: 'https://rossmartin.github.io',
  base: '/hey-camera',
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
