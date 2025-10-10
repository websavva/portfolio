import {
  defineNuxtModule,
  createResolver,
  addImportsDir,
  installModule,
} from '@nuxt/kit';

export default defineNuxtModule({
  meta: {
    name: 'tailwindcss',
  },

  moduleDependencies: {
    '@nuxtjs/tailwindcss': {},
  },

  async setup(_, nuxt) {
    const { resolve } = createResolver(import.meta.url);

    nuxt.options.css.push(
      resolve('./runtime/tailwind.css'),
    );

    addImportsDir(resolve('./runtime/imports'));

    // await installModule(TailwindcssModule);
  },
});
