import type { Page } from '#server/types';

export type CurrentPageContext = Page;

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

export const useCurrentPageContent = () => {
  const context = useCurrentPageContext();

  return computed(() => context.value.content);
};
