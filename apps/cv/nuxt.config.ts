import { createResolver } from '@nuxt/kit';

const { resolve } = createResolver(import.meta.url);

export default defineNuxtConfig({
  buildDir: '.nuxt',

  compatibilityDate: '2025-07-15',

  extends: ['@websavva/portfolio-core/nuxt.config'],

  features: {
    noScripts: true,
    inlineStyles: true,
  },

  nitro: {
    output: {
      dir: resolve('../.output'),
      publicDir: resolve('../.output/public'),
    },
  },
});
