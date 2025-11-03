import { readFile } from 'node:fs/promises';

import {
  defineNuxtModule,
  createResolver,
  addTemplate,
} from '@nuxt/kit';

export default defineNuxtModule({
  meta: {
    name: 'custom-eslint',
  },

  moduleDependencies: {
    '@nuxt/eslint': {
      defaults: {
        config: {
          typescript: true,
          import: true,
        },
      },
    },
  },

  setup() {
    const { resolve } = createResolver(import.meta.url);

    addTemplate({
      filename: 'custom-eslint.config.mjs',
      write: true,
      getContents: () => {
        return readFile(
          resolve('./templates/eslint.config.mjs'),
          'utf-8',
        );
      },
    });

    addTemplate({
      filename: 'custom-eslint.config.d.ts',
      write: true,
      getContents: () => {
        return readFile(
          resolve('./templates/eslint.config.d.ts'),
          'utf-8',
        );
      },
    });
  },
});
