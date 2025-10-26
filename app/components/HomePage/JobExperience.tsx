import {
  HomePageSection,
  SectionDelimiter,
  NuxtIcon,
} from '#components';

export default defineComponent({
  name: 'HomePageJobExperience',

  props: {
    class: {
      type: String,
      default: '',
    },
  },

  setup(props) {
    const { locale } = useI18n();

    const bio = useBio();
    const content = useCurrentPageContent();

    return () => {
      return (
        <HomePageSection
          class={props.class}
          iconName="codicon:briefcase"
          color="primary"
          subtitle={content.value.jobExperience.subtitle}
        >
          {{
            title: () => content.value.jobExperience.title,
            default: () => (
              <ul
                class={cn(
                  'flex flex-col gap-5 pl-10 max-xs:pl-0 max-sm:pl-7 border-l max-xs:border-none border-white/30',
                )}
              >
                {bio.value.jobExperience.map(
                  (job, index) => (
                    <motion.li
                      key={job.company}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 1,
                        delay: index * 0.2,
                      }}
                      inViewOptions={{
                        margin: '0px 0px -150px',
                        once: true,
                      }}
                      class={cn({ 'mt-10': index > 0 })}
                    >
                      <div class={cn('flex max-sm:flex-col gap-10 max-sm:gap-2')}>
                        <div class={cn('flex flex-col')}>
                          <span
                            class={cn(
                              'text-sm text-editor-fg max-sm:my-0',
                              index > 0
                                ? 'mt-7 mb-8'
                                : 'mb-8 mt-1',
                            )}
                          >
                            {getMonthYear(
                              job.timerange.start,
                              locale.value,
                            )}{' '}
                            -{' '}
                            {job.timerange.end
                              ? getMonthYear(
                                  job.timerange.end,
                                  locale.value,
                                )
                              : content.value.jobExperience
                                  .present}
                          </span>
                          <img
                            src={job.companyImageUrl}
                            alt=""
                            role="presentation"
                            class={cn(
                              'h-28 w-auto rounded-xl max-lg:h-20 object-cover max-sm:hidden',
                            )}
                          />
                        </div>

                        <div
                          class={cn('flex flex-col flex-1')}
                        >
                          {index > 0 && (
                            <SectionDelimiter
                              class={cn('mb-5')}
                            />
                          )}

                          <HomePageSection.Highlight
                            class={cn(
                              'mb-5 text-lg font-medium',
                            )}
                          >
                            {job.company} | {job.position}
                          </HomePageSection.Highlight>

                          <ul
                            class={cn(
                              'flex flex-col gap-2 text-editor-fg list-disc pl-5',
                            )}
                          >
                            {job.responsibilities.map(
                              (responsibility) => (
                                <li key={responsibility}>
                                  {responsibility}
                                </li>
                              ),
                            )}
                          </ul>

                          <a
                            href={job.url}
                            target="_blank"
                            class={cn(
                              'text-editor-fg text-sm flex items-center',
                              'hover:text-[var(--section-color)] transition mt-5 opacity-80',
                            )}
                          >
                            <NuxtIcon
                              name="codicon:link-external"
                              class={cn('size-4 mr-2')}
                            />

                            {
                              content.value.jobExperience
                                .visitWebsite
                            }
                          </a>
                        </div>
                      </div>
                    </motion.li>
                  ),
                )}
              </ul>
            ),
          }}
        </HomePageSection>
      );
    };
  },
});
