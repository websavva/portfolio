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
          include: '**/*.yaml',
          cwd: resolve('app/content'),
        },
      ],

      schema: z.object({
        title: z.string(),
        description: z.string(),
        iconName: z.string(),
        imageUrl: z.string(),
        repoUrl: z.string(),
        previewUrl: z.string(),
        date: z.string().date(),
        path: z.string(),
        realPath: z.string().optional(),
        component: z.string().optional(),
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
