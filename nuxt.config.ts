import { createResolver } from '@nuxt/kit';

import i18Config from './config/i18n/config.json';
import { publicDefine } from './config/env';

const { resolve } = createResolver(import.meta.url);

const isProd = process.env.NODE_ENV === 'production';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  buildDir: '.nuxt',

  modules: ['@nuxt/icon', '@nuxt/content'],

  icon: {
    mode: 'svg',
    componentName: 'NuxtIcon',
    customCollections: [
      {
        prefix: 'local',
        dir: resolve('./app/icons'),
      },
    ],
    serverBundle: {
      collections: [
        'codicon',
        'devicon',
        'logos',
        'material-icon-theme',
      ],
    },
  },

  app: {
    head: {
      link: [
        {
          rel: 'preconnect',
          href: 'https://fonts.googleapis.com',
        },
        {
          rel: 'preconnect',
          href: 'https://fonts.gstatic.com',
          crossorigin: '',
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Inter:ital,wght@0,100..900;1,100..900&display=swap',
        },
      ],
    },
  },

  i18n: i18Config,

  vite: {
    define: publicDefine,
    server: {
      allowedHosts: true,
    },

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

  nitro: {
    compressPublicAssets: {
      brotli: isProd,
    },

    esbuild: {
      options: {
        define: publicDefine,
      },
    },
  },
});
