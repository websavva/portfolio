import type { PagesCollectionItem } from '@nuxt/content';

export type CurrentPageContext = {
  data: PagesCollectionItem;
  dictionary: Record<string, any>;
};

export const currentPageContextInjectionKey = Symbol(
  'currentPage',
) as InjectionKey<ComputedRef<CurrentPageContext>>;

export const provideCurrentPage = (
  page: MaybeRefOrGetter<CurrentPageContext>,
) => {
  provide(
    currentPageContextInjectionKey,
    computed(() => toValue(page)),
  );
};

export const useCurrentPageContext = () => {
  return inject(currentPageContextInjectionKey)!;
};

export const useCurrentPageDictionary = () => {
  return computed(
    () => useCurrentPageContext().value.dictionary,
  );
};
