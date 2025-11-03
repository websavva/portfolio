import { createCommentVNode } from 'vue';

export default defineComponent({
  name: 'PageHead',

  setup() {
    const page = useCurrentPageContext();

    useHead(() => {
      return {
        title: page.value.title,
        description: page.value.description,
        meta: [
          {
            name: 'og:title',
            content: page.value.title,
          },
          {
            name: 'og:description',
            content: page.value.description,
          },
        ],
      };
    });

    return () => {
      return createCommentVNode('', true);
    };
  },
});
