import { defineConfig } from 'astro/config';

import node from '@astrojs/node';

import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  output: 'server',
  server:{ 
    port: 3002
  },

  adapter: node({
    mode: 'standalone'
  }),

  integrations: [tailwind()]
});