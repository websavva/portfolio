export default defineNuxtConfig({
  buildDir: '.nuxt',

  compatibilityDate: '2025-07-15',

  extends: ['@websavva/portfolio-core/nuxt.config'],

  features: {
    noScripts: true,
    inlineStyles: true,
  },
});
