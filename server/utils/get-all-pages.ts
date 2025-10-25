import { type H3Event, getQuery } from 'h3';
import { queryCollection } from '@nuxt/content/server';

import {
  getPageSelectionParamsFromQuery,
  getPageDictionaryPath,
} from './common';

import type { Page } from '#server/types';

export const fieldsToSelect = [
  'id',
  'title',
  'iconName',
  'repoUrl',
  'description',
  'previewUrl',
  'date',
  'path',
  'realPath',
  'imageUrl',
  'component',
  'service',
  'technologies',
  'service',
  'industry',
  'priority',
  'fileName',
] as const;

export async function getAllPages(event: H3Event) {
  const { locale } = getPageSelectionParamsFromQuery(
    getQuery(event),
  );

  const [allPages, allPageDictionaries] = await Promise.all(
    [
      queryCollection(event, 'pages')
        .select(...fieldsToSelect)
        .order('priority', 'ASC')
        .all(),
      queryCollection(event, 'locales')
        .select('stem', 'meta')
        .all(),
    ],
  );

  for (const page of allPages) {
    const pageDictionary = allPageDictionaries.find(
      (dictionary) =>
        dictionary.stem ===
        getPageDictionaryPath(page.path, locale),
    );

    Object.assign(
      page,
      (pageDictionary?.meta.body as Record<string, any>) ||
        {},
    );
  }

  return allPages as Array<Page>;
}
