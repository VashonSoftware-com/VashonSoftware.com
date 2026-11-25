import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import svelte from '@astrojs/svelte';

export default defineConfig({
  site: 'https://VashonSoftware.com',
  integrations: [sitemap({
    changefreq: 'weekly',
    priority: 0.7,
    lastmod: new Date(),
    // Per-domain parked pages are canonical to /domains/; list only that one
    // and leave out the post-checkout thank-you page
    filter: (page) => !/\/domains\/[^/]+\/$/.test(page) && !/\/websites\/thanks\/?$/.test(page),
  }), svelte()],
  vite: {
    plugins: [tailwindcss()],
  },
  build: {
    inlineStylesheets: 'always',
  },
});