export default defineNuxtConfig({
  buildDir: '.nuxt',

  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  extends: ['@websavva/portfolio-core/nuxt.config'],

  features: {
    noScripts: true,
    inlineStyles: true,
  },
});
