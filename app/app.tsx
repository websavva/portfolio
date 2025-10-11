import { Editor } from '#components';

export default defineComponent({
  setup() {
    useHead({
      htmlAttrs: {
        class: 'bg-editor-background text-white text-[1',
      },
    });

    const $t = useI18nTranslation();

    return () => {
      return <Editor>
        <h1>Editor</h1>
      </Editor>
    };
  },
});
