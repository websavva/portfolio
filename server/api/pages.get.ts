import type { PagesCollectionItem } from '@nuxt/content';

const fieldsToSelect = [
  'id',
  'title',
  'description',
  'iconName',
  'repoUrl',
  'previewUrl',
  'year',
  'path',
  'realPath',
  'imageUrl',
] as const;

export default defineEventHandler(async (event) => {
  const pages = await queryCollection(event, 'pages')
    .select(...fieldsToSelect)
    .all();

  return pages as Array<
    Pick<
      PagesCollectionItem,
      (typeof fieldsToSelect)[number]
    >
  >;
});
