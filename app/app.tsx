import { Editor, PageHead } from '#components';

import type { Page } from '#server/types';

export const PAGES_COMPONENTS = {
  HomePage: defineAsyncComponent(
    () => import('@/components/HomePage'),
  ),
  ArticlePage: defineAsyncComponent(
    () => import('@/components/ArticlePage'),
  ),
};

export default defineComponent({
  async setup() {
    const $t = useI18nTranslation();

    useHead(() => ({
      titleTemplate: $t('titleTemplate'),
      htmlAttrs: {
        class:
          'bg-editor-background overflow-hidden text-white [--root-font-size:16px] max-3xl:[--root-font-size:12px] text-(length:--root-font-size)',
      },
    }));

    const $route = useRoute();

    const { locale } = useI18n();

    provideCurrentPage(() => pageResponse.value! as Page);

    const PageComponent = computed(() => {
      return (
        PAGES_COMPONENTS[
          pageResponse.value
            ?.component as keyof typeof PAGES_COMPONENTS
        ] || PAGES_COMPONENTS.ArticlePage
      );
    });

    const pageQuery = computed(() => {
      return {
        path: $route.path,
        locale: locale.value,
      };
    });

    watch(
      () => $route.hash,
      (newHash) => {
        if (import.meta.server || !newHash) return;

        scrollToElement(newHash.slice(1));
      },
      {
        immediate: true,
      },
    );

    const { data: pageResponse } = await useFetch(
      '/api/page',
      {
        query: pageQuery,
      },
    );

    return () => {
      return (
        <Editor>
          <div>
            {pageResponse.value && <PageHead />}

            {pageResponse.value ? (
              <PageComponent.value
                key={pageResponse.value?.id}
              />
            ) : (
              <div>Page not found</div>
            )}
          </div>
        </Editor>
      );
    };
  },
});
