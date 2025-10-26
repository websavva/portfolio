import {
  HomePageSection,
  Contacts,
  Card,
} from '#components';

export default defineComponent({
  name: 'HomePageAboutMe',

  props: {
    class: {
      type: String,
      default: '',
    },
  },

  setup(props) {
    const bio = useBio();

    const content = useCurrentPageContent();

    return () => {
      return (
        <HomePageSection
          class={props.class}
          subtitle={content.value.aboutMe.subtitle}
          iconName="codicon:account"
          color="green"
        >
          {{
            title: () => content.value.aboutMe.title,
            default: () => (
              <div>
                <div
                  class={cn('flex gap-10 justify-between max-sm:flex-col')}
                >
                  <div class={cn('flex flex-col sm:w-1/2')}>
                    <span
                      class={cn('text-2xl font-medium')}
                    >
                      {bio.value.fullName}
                    </span>

                    <HomePageSection.Highlight
                      class={cn('text-base mt-1 mb-10 max-sm:mb-5')}
                    >
                      {bio.value.occupation}
                    </HomePageSection.Highlight>

                    {(
                      content.value.aboutMe
                        .description as string[]
                    ).map((description, index) => (
                      <p
                        key={description}
                        class={cn(
                          'text-lg text-editor-fg',
                          {
                            'mt-5': index > 0,
                          },
                        )}
                      >
                        {description}
                      </p>
                    ))}
                  </div>

                  <div
                    class={cn(
                      'size-48 bg-white/50 rounded-full mr-10 max-sm:self-center',
                    )}
                  />
                </div>

                <div
                  class={cn('mt-15 flex justify-between max-lg:flex-col-reverse max-xs:flex-col')}
                >
                  <div class={cn('flex-1')}>
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 1 }}
                      inViewOptions={{
                        margin: '0px 0px -150px',
                        once: true,
                      }}
                    >
                      <HomePageSection.Highlight
                        class={cn(
                          'pl-2 border-l-2 border-current',
                        )}
                      >
                        {content.value.aboutMe.languages}
                      </HomePageSection.Highlight>

                      <ul
                        class={cn(
                          'mt-3 flex items-center gap-5 border-b border-t border-editor-background-secondary py-3 text-lg w-max max-lg:w-full',
                          'max-lg:flex-col max-lg:items-start'
                        )}
                      >
                        {bio.value.languages.map(
                          (language) => (
                            <li
                              key={language.code}
                              class={cn(
                                'flex items-center gap-1 font-semibold',
                              )}
                            >
                              <span class={cn('')}>
                                {language.name}
                              </span>

                              <span>-</span>

                              <span
                                class={cn('text-editor-fg')}
                              >
                                {language.level}
                              </span>
                            </li>
                          ),
                        )}
                      </ul>
                    </motion.div>

                    <Contacts class={cn('mt-5')} />
                  </div>

                  <motion.a
                    href={bio.value.collegeDegree.url}
                    target="_blank"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1 }}
                    inViewOptions={{
                      margin: '0px 0px -150px',
                      once: true,
                    }}
                    class={cn('flex-1 ml-auto cursor-pointer max-lg:ml-0 max-lg:mb-10 max-xs:mb-0 max-xs:mt-10')}
                  >
                    <Card class={cn('flex p-10 max-sm:p-5 max-xs:flex-col max-xs:items-center max-xs:py-8')}>
                      <div
                        class={cn(
                          'size-28 max-sm:size-20 bg-white rounded-3xl flex items-center justify-center shrink-0',
                        )}
                      >
                        <img
                          src={
                            bio.value.collegeDegree
                              .uniLogoUrl
                          }
                          alt=""
                          role="presentation"
                          class={cn('size-[90%]')}
                        />
                      </div>

                      <div class={cn('flex flex-col ml-5 max-xs:ml-0 max-xs:text-center')}>
                        <span
                          class={cn(
                            'text-xl font-medium mb-1 max-sm:text-lg max-xs:mt-3',
                          )}
                        >
                          {bio.value.collegeDegree.major}
                        </span>

                        <HomePageSection.Highlight class={cn('max-sm:text-sm')}>
                          {
                            bio.value.collegeDegree
                              .university
                          }
                        </HomePageSection.Highlight>
                      </div>
                    </Card>
                  </motion.a>
                </div>
              </div>
            ),
          }}
        </HomePageSection>
      );
    };
  },
});
