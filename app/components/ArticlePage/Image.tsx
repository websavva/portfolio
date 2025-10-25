export default defineComponent({
  name: 'ArticlePageImage',

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
        <div
          class={cn(
            'relative overflow-hidden rounded-2xl',
            'border-2 border-primary/20',
            'group',
            props.class,
          )}
        >
          <img
            src={page.value.imageUrl}
            role="presentation"
            class={cn(
              'relative z-[1] w-full h-auto object-cover',
              'rounded-xl',
              'transition-all duration-500 ease-out',
              'group-hover:scale-110',
            )}
          />
        </div>
      );
    };
  },
});
