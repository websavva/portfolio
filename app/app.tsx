import {
  TheApp,
  PageHead,
  ErrorPageContent,
} from '#components';

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

    const { data: pageResponse, error: pageError } =
      await useFetch('/api/page', {
        query: pageQuery,
      });

    return () => {
      return (
        <TheApp>
          <div>
            {pageResponse.value && <PageHead />}

            {pageResponse.value ? (
              <PageComponent.value
                key={pageResponse.value?.id}
              />
            ) : (
              <ErrorPageContent
                error={pageError.value as any}
              />
            )}
          </div>
        </TheApp>
      );
    };
  },
});
