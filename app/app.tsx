import { Editor, ContentRenderer } from '#components';

export default defineComponent({
  async setup() {
    useHead({
      htmlAttrs: {
        class: 'bg-editor-background text-white text-[1',
      },
    });

    const route = useRoute();

    const { data: page } = await useAsyncData(
      route.path,
      () => {
        return queryCollection('pages')
          .path(route.path)
          .first();
      },
    );

    return () => {
      return (
        <Editor>
          {page.value ? (
            <ContentRenderer value={page.value} />
          ) : (
            <div>Page not found</div>
          )}
        </Editor>
      );
    };
  },
});
