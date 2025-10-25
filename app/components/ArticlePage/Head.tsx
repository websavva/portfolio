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
              'text-5xl md:text-6xl font-bold',
              'mb-6',
            )}
          >
            {page.value.title}
          </h1>

          <p
            class={cn(
              'text-lg md:text-xl text-editor-fg/80',
              'max-w-3xl mx-auto leading-relaxed',
            )}
          >
            {page.value.description}
          </p>
        </header>
      );
    };
  },
});
