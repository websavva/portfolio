import { z } from 'zod';
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

      schema: z.object({
        id: z.string().optional(),
        title: z.string(),
        iconName: z.string(),
        description: z.string(),
        imageUrl: z.string().optional(),
        repoUrl: z.string().optional(),
        previewUrl: z.string().optional(),
        year: z.number().optional(),
        path: z.string(),
        realPath: z.string().optional(),
      }),
    }),

    locales: defineCollection({
      type: 'data',
      source: [
        {
          include: '**/locales/*.json',
          cwd: resolve('app/content'),
        },
      ],
      schema: z.record(z.string(), z.any()),
    }),
  },
});
