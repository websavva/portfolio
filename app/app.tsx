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

    const pagePath = computed(() => {
      return $route.path === '/' ? '/home' : $route.path;
    });

    const pageContext = computed(() => {
      return {
        $t: pageDictionary.value,
      };
    });

    const [{ data: page }, { data: pageDictionary }] =
      await Promise.all([
        useAsyncData(
          $route.path,
          () => {
            return queryCollection('pages')
              .path(pagePath.value)
              .first();
          },
          {
            watch: [pagePath],
          },
        ),
        useAsyncData(
          'locales',
          async () => {
            const localePath =
              `${pagePath.value}/locales/${locale.value}`.replace(
                /^\//,
                '',
              );

            return queryCollection('locales')
              .where('stem', '=', localePath)
              .select('meta')
              .first()
              .then((res) => res?.meta.body);
          },
          {
            watch: [locale, pagePath],
          },
        ),
      ]);

    return () => {
      return (
        <Editor>
          <div>
            {page.value ? (
              <ContentRenderer
                value={page.value}
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
