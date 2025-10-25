import { Editor } from '#components';

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
    useHead({
      htmlAttrs: {
        class:
          'bg-editor-background text-white text-[16px] overflow-hidden',
      },
    });

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
