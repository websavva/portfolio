import type { PagesCollectionItem } from '@nuxt/content';

export interface Page
  extends Pick<
    PagesCollectionItem,
    | 'id'
    | 'title'
    | 'iconName'
    | 'repoUrl'
    | 'previewUrl'
    | 'date'
    | 'path'
    | 'realPath'
    | 'imageUrl'
    | 'description'
    | 'component'
    | 'service'
    | 'technologies'
    | 'industry'
  > {
  content: any;
}
