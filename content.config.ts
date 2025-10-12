import { createResolver } from '@nuxt/kit';
import {
  defineCollection,
  defineContentConfig,
} from '@nuxt/content';

const { resolve } = createResolver(import.meta.url);

export default defineContentConfig({
  collections: {
    pages: defineCollection({
      // Specify the type of content in this collection
      type: 'page',
      // Load every file inside the `content` directory
      source: [
        {
          include: '**/*.md',
          cwd: resolve('app/content'),
        },
      ],
    }),
  },
});
