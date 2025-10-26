export default defineComponent({
  name: 'ArticlePageDetails',

  props: {
    class: {
      type: String,
      default: '',
    },
  },

  setup(props) {
    const page = useCurrentPageContext();
    const $t = useI18nTranslation();

    const metadata = computed(() => [
      {
        label: $t('article.industry'),
        value: page.value.industry || page.value.service,
        icon: 'codicon:briefcase',
      },
      {
        label: $t('article.year'),
        value: new Date(page.value.date).getFullYear(),
        icon: 'codicon:calendar',
      },
      {
        label: $t('article.service'),
        value: page.value.service,
        icon: 'codicon:tools',
      },
    ]);

    return () => {
      return (
        <div
          class={cn(
            'flex max-md:flex-col border border-editor-fg/20 border-l-0 border-r-0 *:not-first:border-l *:not-first:border-editor-fg/20 md:*:not-first:px-8  md:*:not-first:ml-8 max-md:*:not-first:border-l-0 max-md:*:not-first:border-t',
            props.class,
          )}
        >
          {metadata.value.map((item, index) => (
            <div
              key={index}
              class={cn('flex flex-col gap-3 flex-1', 'px-6 py-3 max-md:py-3 max-md:pl-0 max-xs:items-center')}
            >
              <div class="flex items-center gap-3">
                <div class="text-xs text-editor-fg/60 font-medium uppercase tracking-wider">
                  {item.label}
                </div>
              </div>
              <div class="font-bold text-editor-fg">
                {item.value}
              </div>
            </div>
          ))}
        </div>
      );
    };
  },
});
