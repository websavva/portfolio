import { NuxtIcon } from '#components';

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

    useHead(() => ({
      link: [
        {
          key: 'article-image',
          rel: 'preload',
          href: page.value.imageUrl,
          as: 'image',
        },
      ],
    }));

    return () => {
      return (
        <div
          class={cn(
            'overflow-hidden relative rounded-2xl',
            'border-2 border-primary/20',
            'w-full h-128 max-lg:h-96 max-md:h-60',
            'group',
            props.class,
          )}
        >
          <NuxtIcon
            name="codicon:loading"
            class={cn(
              'size-12',
              'text-primary animate-spin',
              'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2',
            )}
          />

          <img
            src={page.value.imageUrl}
            role="presentation"
            class={cn(
              'size-full object-cover',
              'rounded-xl',
              'transition-all duration-500 relative z-10',
              'group-hover:scale-110',
            )}
            height={500}
          />
        </div>
      );
    };
  },
});
