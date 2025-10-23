export default defineComponent({
  name: 'ArticlePage',

  setup() {
    const page = useCurrentPageContext();

    return () => {
      return (
        <div>
          <h1 class={cn('text-2xl font-bold')}>
            {page.value.title}
          </h1>

          <img
            src={page.value.imageUrl}
            alt={page.value.title}
            class={cn('w-full h-full object-cover')}
          />
        </div>
      );
    };
  },
});
