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

    const dictionary = useCurrentPageDictionary();

    return () => {
      return (
        <HomePageSection
          class={props.class}
          subtitle={dictionary.value.aboutMe.subtitle}
          iconName="codicon:account"
          color="green"
        >
          {{
            title: () => dictionary.value.aboutMe.title,
            default: () => (
              <div>
                <div
                  class={cn('flex gap-10 justify-between')}
                >
                  <div class={cn('flex flex-col w-1/2')}>
                    <span
                      class={cn('text-2xl font-medium')}
                    >
                      {bio.value.fullName}
                    </span>

                    <HomePageSection.Highlight
                      class={cn('text-base mt-1 mb-10')}
                    >
                      {bio.value.occupation}
                    </HomePageSection.Highlight>

                    {(
                      dictionary.value.aboutMe
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
                      'size-48 bg-white/50 rounded-full mr-10',
                    )}
                  />
                </div>

                <div
                  class={cn('mt-15 flex justify-between')}
                >
                  <div class={cn('flex-1')}>
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 1 }}
                      inViewOptions={{
                        margin: '0px 0px -150px',
                      }}
                    >
                      <HomePageSection.Highlight
                        class={cn(
                          'pl-2 border-l-2 border-current',
                        )}
                      >
                        {dictionary.value.aboutMe.languages}
                      </HomePageSection.Highlight>

                      <ul
                        class={cn(
                          'mt-3 flex items-center gap-5 border-b border-t border-editor-background-secondary py-3 text-lg w-max',
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

                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1 }}
                    inViewOptions={{
                      margin: '0px 0px -150px',
                    }}
                    class={cn('flex-1 ml-auto')}
                  >
                    <Card
                      class="hover:shadow-green-500/30 flex"
                      glowClassName="from-[#6bc072] to-[#6bc072]"
                    >
                      <div
                        class={cn(
                          'size-28 bg-white rounded-3xl flex items-center justify-center shrink-0',
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

                      <div class={cn('flex flex-col ml-5')}>
                        <span
                          class={cn(
                            'text-xl font-medium mb-1',
                          )}
                        >
                          {bio.value.collegeDegree.major}
                        </span>

                        <HomePageSection.Highlight>
                          {
                            bio.value.collegeDegree
                              .university
                          }
                        </HomePageSection.Highlight>
                      </div>
                    </Card>
                  </motion.div>
                </div>
              </div>
            ),
          }}
        </HomePageSection>
      );
    };
  },
});
