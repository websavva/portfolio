import {
  defineNuxtModule,
  createResolver,
  addImportsDir,
  installModule,
} from '@nuxt/kit';

export interface ModuleOptions {
  cssPath?: string;
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'tailwindcss',
    configKey: 'tw',
  },

  moduleDependencies: {
    '@nuxtjs/tailwindcss': {},
  },

  defaults() {
    const { resolve } = createResolver(import.meta.url);

    return {
      cssPath: resolve('./runtime/default.css'),
    };
  },

  async setup(options, nuxt) {
    const { resolve } = createResolver(import.meta.url);

    nuxt.options.css.push(options.cssPath!);

    addImportsDir(resolve('./runtime/imports'));
  },
});
