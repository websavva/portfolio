import { Editor } from '#components';

export default defineComponent({
  setup(_, { slots }) {
    const $t = useI18nTranslation();

    useHead(() => ({
      titleTemplate: $t('titleTemplate'),
      htmlAttrs: {
        class:
          'bg-editor-background overflow-hidden text-white [--root-font-size:16px] max-3xl:[--root-font-size:12px] text-(length:--root-font-size)',
      },
    }));

    return () => {
      return (
        <Editor>
          <div>{slots.default?.()}</div>
        </Editor>
      );
    };
  },
});
