import { Card, NuxtIcon } from '#components';

export default defineComponent({
  name: 'ArticlePageLinks',

  props: {
    class: {
      type: String,
      default: '',
    },
  },

  setup(props) {
    const page = useCurrentPageContext();
    const $t = useI18nTranslation();

    const projectLinks = computed(() => {
      return [
        {
          label: $t('article.visitWebsite'),
          url: page.value.previewUrl,
          icon: 'codicon:globe',
        },
        {
          label: $t('article.visitRepository'),
          url: page.value.repoUrl,
          icon: 'codicon:github',
        },
      ];
    });

    return () => {
      return (
        <div
          class={cn(
            'flex flex-col md:flex-row gap-4',
            props.class,
          )}
        >
          {projectLinks.value.map((link, index) => (
            <a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              class={cn('flex-1')}
            >
              <Card
                class={cn(
                  'group',
                  'relative overflow-hidden h-full',
                  'bg-editor-sidebar-bg/50 backdrop-blur-sm',
                  'border-1 border-editor-fg/20',
                  'rounded-xl p-10',
                  'transition-all duration-300',
                  '[--card-color:var(--color-primary)]',
                )}
              >
                <div class="flex items-start justify-between mb-4">
                  <div
                    class={cn(
                      'w-14 h-14 rounded-xl',
                      'bg-primary/15',
                      'flex items-center justify-center',
                      'text-primary',
                      'group-hover:bg-primary/25 group-hover:scale-110',
                      'transition-all duration-300',
                    )}
                  >
                    <NuxtIcon
                      name={link.icon}
                      class="text-2xl"
                    />
                  </div>
                  <NuxtIcon
                    name="codicon:link-external"
                    class={cn(
                      'text-lg text-editor-fg/40',
                      'group-hover:text-primary transition-colors',
                    )}
                  />
                </div>
                <div class="text-xl font-bold mb-2">
                  {link.label}
                </div>
                <div class="text-sm text-editor-fg/60">
                  {link.url.replace(/^https?:\/\//, '')}
                </div>

                {/* Bottom accent line */}
                <div
                  class={cn(
                    'absolute bottom-0 left-0 h-1 w-0 bg-primary',
                    'group-hover:w-full transition-all duration-500',
                  )}
                />
              </Card>
            </a>
          ))}
        </div>
      );
    };
  },
});
