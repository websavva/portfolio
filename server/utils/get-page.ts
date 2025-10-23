import { type H3Event, getQuery } from 'h3';
import { queryCollection } from '@nuxt/content/server';

import {
  getPageSelectionParamsFromQuery,
  getPageDictionaryPath,
} from './common';

import type { Page } from '#server/types';

import { fieldsToSelect } from './get-all-pages';

export async function getPage(event: H3Event) {
  const { path, locale } = getPageSelectionParamsFromQuery(
    getQuery(event),
  );

  const pageData = await queryCollection(event, 'pages')
    .orWhere((query) =>
      query
        .where('path', '=', path)
        .where('realPath', '=', path),
    )
    .select(...fieldsToSelect)
    .first();

  if (!pageData) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Page not found',
    });
  }

  const pageDictionaryPath = getPageDictionaryPath(
    pageData.path,
    locale,
  );

  const dictionary = await queryCollection(event, 'locales')
    .where('stem', '=', pageDictionaryPath)
    .select('meta')
    .first()
    .then((res) => res?.meta.body);

  Object.assign(pageData, dictionary);

  return pageData as Page;
}
