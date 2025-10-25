import { createResolver } from '@nuxt/kit';

import i18Config from './config/i18n/config.json';
import { publicDefine } from './config/env';

const { resolve } = createResolver(import.meta.url);

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

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

  i18n: i18Config,

  vite: {
    define: publicDefine,
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
    esbuild: {
      options: {
        define: publicDefine,
      },
    },
  },
});
