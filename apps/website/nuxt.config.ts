import { createResolver } from '@nuxt/kit';

const { resolve } = createResolver(import.meta.url);

const isProd = process.env.NODE_ENV === 'production';

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  extends: ['@websavva/portfolio-core/nuxt.config'],

  buildDir: '.nuxt',

  modules: ['@nuxt/content'],

  tw: {
    cssPath: resolve('./app/assets/base.css'),
  },

  ym: {
    id: process.env.WS_PUBLIC_YM_ID!,
    enabled: isProd,
  },

  vite: {
    resolve: {
      alias: {
        bowser: resolve('node_modules/bowser/bundled.js'),
      },
    },
  },

  alias: {
    '#config': resolve('config'),
    '#server': resolve('server'),
  },

  typescript: {
    tsConfig: {
      include: ['../config/**/*.ts'],
    },
  },
});
