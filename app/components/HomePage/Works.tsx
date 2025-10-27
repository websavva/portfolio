import {
  HomePageSection,
  Card,
  NuxtLink,
  NuxtIcon,
} from '#components';

export default defineComponent({
  name: 'HomePageWorks',

  props: {
    class: {
      type: String,
      default: '',
    },
  },

  setup(props) {
    const content = useCurrentPageContent();

    const pages = usePages();

    const works = computed(() => {
      return pages.value
        .filter(
          ({ path, realPath }) =>
            path !== '/' && realPath !== '/',
        )
        .slice(0, 4);
    });

    return () => {
      return (
        <HomePageSection
          class={props.class}
          subtitle={content.value.works.subtitle}
          iconName="codicon:layers"
          color='indigo'
        >
          {{
            title: () => content.value.works.title,
            default: () => (
              <ul
                class={cn(
                  'grid grid-cols-1 md:grid-cols-2 gap-8',
                )}
              >
                {works.value.map((work, index) => (
                  <motion.li
                    key={work.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    inViewOptions={{
                      margin: '0px 0px -150px',
                      once: true,
                    }}
                    transition={{
                      duration: 0.6,
                      delay: index * 0.1,
                      ease: [0.25, 0.1, 0.25, 1],
                    }}
                  >
                    <NuxtLink
                      href={work.realPath || work.path}
                      class={cn('block h-full group')}
                    >
                      <Card
                        class={cn(
                          'h-full flex flex-col gap-0 !p-0',
                          'transition-all duration-500 ease-out',
                        )}
                      >
                        {/* Image Container */}
                        <div
                          class={cn(
                            'relative w-full aspect-[16/10]',
                            'overflow-hidden',
                          )}
                        >
                          <img
                            src={work.imageUrl}
                            alt={work.title}
                            loading='lazy'
                            class={cn(
                              'w-full h-full object-cover',
                              'transition-all duration-700 ease-out opacity-70',
                            )}
                          />

                          {/* Overlay gradient */}
                          <div
                            class={cn(
                              'absolute inset-0',
                              'bg-gradient-to-t from-black/80 via-black/20 to-transparent',
                              'opacity-60 group-hover:opacity-80',
                              'transition-opacity duration-500',
                            )}
                          />

                          {/* Bottom label */}
                          <div
                            class={cn(
                              'absolute bottom-0 left-0 right-0',
                              'p-6',
                              'transform translate-y-2',
                              'group-hover:translate-y-0',
                              'transition-transform duration-500',
                            )}
                          >
                            <div
                              class={cn(
                                'flex items-center gap-2',
                                'text-[var(--section-color)] text-sm font-medium',
                                'opacity-0 group-hover:opacity-100',
                                'transition-opacity duration-500 delay-100',
                              )}
                            >
                              <span>View Project</span>
                              <NuxtIcon
                                name="codicon:arrow-right"
                                class={cn('size-4')}
                              />
                            </div>
                          </div>
                        </div>

                        {/* Content */}
                        <div
                          class={cn(
                            'p-6 flex-grow flex flex-col',
                          )}
                        >
                          <h3
                            class={cn(
                              'text-lg font-semibold',
                              'mb-3',
                              'group-hover:text-[var(--section-color)]',
                              'transition-colors duration-300',
                            )}
                          >
                            {work.title}
                          </h3>

                          {work.description && (
                            <p
                              class={cn(
                                'text-gray-400 leading-relaxed',
                                'line-clamp-3',
                              )}
                            >
                              {work.description}
                            </p>
                          )}
                        </div>
                      </Card>
                    </NuxtLink>
                  </motion.li>
                ))}
              </ul>
            ),
          }}
        </HomePageSection>
      );
    };
  },
});
