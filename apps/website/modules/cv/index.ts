import { createRequire } from 'node:module';
import { dirname, join } from 'node:path';

import {
  defineNuxtModule,
  createResolver,
} from '@nuxt/kit';

export default defineNuxtModule({
  meta: {
    name: 'cv',
  },

  async setup(_, nuxt) {
    const { resolve } = createResolver(import.meta.url);

    if (!nuxt.options.nitro.handlers)
      nuxt.options.nitro.handlers = [];

    nuxt.options.nitro.handlers.push({
      route: '/cv',
      handler: resolve('./runtime/route.ts'),
    });

    nuxt.hook('nitro:config', async (nitroConfig) => {
      if (!nitroConfig.publicAssets)
        nitroConfig.publicAssets = [];

      const _require = createRequire(import.meta.url);

      const cvSrcDir = join(
        dirname(_require.resolve('@websavva/portfolio-cv')),
        'docs',
      );

      nitroConfig.publicAssets?.push({
        dir: cvSrcDir,
        baseURL: '/docs/cv',
        maxAge: 10 * 60 * 1000,
      });
    });
  },
});
