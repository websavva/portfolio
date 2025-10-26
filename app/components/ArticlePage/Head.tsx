export default defineComponent({
  name: 'ArticlePageHead',

  props: {
    class: {
      type: String,
      default: '',
    },
  },

  setup(props) {
    const page = useCurrentPageContext();

    return () => {
      return (
        <header class={cn('text-center', props.class)}>
          <h1
            class={cn(
              'text-5xl font-bold max-lg:text-4xl',
              'mb-6',
            )}
          >
            {page.value.title}
          </h1>

          <p
            class={cn(
              'text-lg text-editor-fg/80 max-lg:text-base',
              'max-w-xl mx-auto leading-relaxed',
            )}
          >
            {page.value.description}
          </p>
        </header>
      );
    };
  },
});
