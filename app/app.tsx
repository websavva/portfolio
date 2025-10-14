import { Editor, ContentRenderer } from '#components';

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

    const pageContext = computed(() => {
      return {
        $t: pageResponse.value?.pageDictionary,
      };
    });

    const { data: pageResponse } = await useAsyncData(
      () => `${$route.path}-${locale.value}`,
      async () => {
        const page = await queryCollection('pages')
          .orWhere((query) =>
            query
              .where('path', '=', $route.path)
              .where('realPath', '=', $route.path),
          )
          .first();

        if (!page) {
          return null;
        }

        const localePath =
          `${page.path}/locales/${locale.value}`.replace(
            /^\//,
            '',
          );

        const pageDictionary = await queryCollection(
          'locales',
        )
          .where('stem', '=', localePath)
          .select('meta')
          .first()
          .then((res) => res?.meta.body);

        return { page, pageDictionary };
      },
    );

    return () => {
      return (
        <Editor>
          <div>
            {pageResponse.value ? (
              <ContentRenderer
                value={pageResponse.value.page}
                data={pageContext.value}
              />
            ) : (
              <div>Page not found</div>
            )}
            {/* {'a'.repeat(1e6)} */}
          </div>
        </Editor>
      );
    };
  },
});
