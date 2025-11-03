import { SectionDelimiter } from '#components';

export default defineComponent({
  name: 'ArticlePageSection',

  props: {
    class: {
      type: String,
      default: '',
    },
  },

  setup(props, { slots }) {
    return () => {
      return (
        <div class={cn(props.class)}>
          <SectionDelimiter />

          <h2 class={cn('text-3xl font-bold mt-5')}>
            {slots.title?.()}
          </h2>

          <div class={cn('text-editor-fg mt-8')}>
            {slots.default?.()}
          </div>
        </div>
      );
    };
  },
});
