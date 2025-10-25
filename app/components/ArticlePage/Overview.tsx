import {
  ArticlePageOverviewRenderer,
  ArticlePageSection,
} from '#components';

export default defineComponent({
  name: 'ArticlePageOverview',

  props: {
    class: {
      type: String,
      default: '',
    },
  },

  setup(props) {
    const page = useCurrentPageContext();
    const $t = useI18nTranslation();

    return () => {
      return (
        <ArticlePageSection class={cn(props.class)}>
          {{
            title: () => $t('article.overview'),
            default: () => (
              <div class={cn('text-editor-fg mt-8')}>
                <ArticlePageOverviewRenderer
                  content={page.value.content}
                />
              </div>
            ),
          }}
        </ArticlePageSection>
      );
    };
  },
});
