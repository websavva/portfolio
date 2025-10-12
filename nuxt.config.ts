import i18Config from './config/i18n/config.json';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: ['@nuxt/icon', '@nuxt/content'],

  icon: {
    mode: 'svg',
    componentName: 'NuxtIcon',
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
});
