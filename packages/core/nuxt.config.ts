import { createResolver } from '@nuxt/kit';

import i18nConfig from './config/i18n/config';
import { publicDefine } from './config/env';

const { resolve } = createResolver(import.meta.url);

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: ['@nuxt/icon'],

  alias: {
    '@websavva/portoflio-core': resolve(),
  },

  css: [resolve('./app/assets/inter.css')],

  i18n: i18nConfig,

  experimental: {
    componentIslands: true,
    entryImportMap: false,
  },

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

  vite: {
    define: publicDefine,

    server: {
      allowedHosts: true,
    },
  },

  typescript: {
    tsConfig: {
      compilerOptions: {
        allowImportingTsExtensions: true,
      },
    },
  },

  nitro: {
    publicAssets: [
      {
        dir: resolve('./public'),
        maxAge: 10 * 60 * 1000,
      },
    ],

    typescript: {
      tsConfig: {
        compilerOptions: {
          allowImportingTsExtensions: true,
        },
      },
    },

    esbuild: {
      options: {
        define: publicDefine,
      },
    },
  },
});
