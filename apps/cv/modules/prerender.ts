import { defineNuxtModule } from '@nuxt/kit';

export default defineNuxtModule({
  meta: {
    name: 'prerender',
  },

  setup(_, nuxt) {
    nuxt.hook('nitro:config', (nitroConfig) => {
      nitroConfig.prerender = {
        routes: nuxt.options.i18n.locales.map(
          ({ code }) => `/${code}`,
        ),
      };
    });
  },
});
