import {
  defineNuxtModule,
  createResolver,
  addImportsDir,
  addPlugin,
} from '@nuxt/kit';

export default defineNuxtModule({
  meta: {
    name: 'ua',
  },

  setup() {
    const { resolve } = createResolver(import.meta.url);

    addImportsDir(resolve('./runtime/imports'));

    for (const mode of ['client', 'server'] as const) {
      addPlugin({
        src: resolve(`runtime/plugin.${mode}.ts`),
        mode,
      });
    }
  },
});
