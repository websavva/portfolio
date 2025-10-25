import { ArticlePageSection, NuxtIcon } from '#components';

export default defineComponent({
  name: 'ArticlePageTechnologies',

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
            title: () => $t('article.technologies'),
            default: () => (
              <ul class={cn('flex flex-wrap gap-7 mt-8')}>
                {page.value.technologies.map(
                  (technology) => (
                    <li
                      key={technology.name}
                      class={cn(
                        'flex flex-col items-center gap-3',
                      )}
                    >
                      <NuxtIcon
                        name={technology.icon}
                        class={cn('size-15', {
                          '*:fill-current':
                            technology.inverted,
                        })}
                      />

                      <span class={cn('text-base')}>
                        {technology.name}
                      </span>
                    </li>
                  ),
                )}
              </ul>
            ),
          }}
        </ArticlePageSection>
      );
    };
  },
});
