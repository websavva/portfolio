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

    provideCurrentPage(() => pageResponse.value!);

    const { data: pageResponse } = await useAsyncData(
      () => `${$route.path}-${locale.value}`,
      async () => {
        const data = await queryCollection('pages')
          .orWhere((query) =>
            query
              .where('path', '=', $route.path)
              .where('realPath', '=', $route.path),
          )
          .first();

        if (!data) {
          return null;
        }

        const localePath =
          `${data.path}/locales/${locale.value}`.replace(
            /^\//,
            '',
          );

        const dictionary = await queryCollection('locales')
          .where('stem', '=', localePath)
          .select('meta')
          .first()
          .then((res) => res?.meta.body);

        return { data, dictionary } as CurrentPageContext;
      },
    );

    return () => {
      return (
        <Editor>
          <div>
            {pageResponse.value ? (
              <ContentRenderer
                value={pageResponse.value.data}
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
