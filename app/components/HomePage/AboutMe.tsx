import { HomePageSection, Contacts } from '#components';

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

    return () => {
      return (
        <HomePageSection
          class={props.class}
          iconName="codicon:account"
          color="green"
        >
          {{
            title: () => 'About Me',
            subtitle: () => (
              <div class={cn('w-3/4')}>
                I'm a{' '}
                <HomePageSection.Highlight>
                  <span>software developer</span>
                </HomePageSection.Highlight>{' '}
                specialized on Web Applications
              </div>
            ),
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

                    <HomePageSection.Highlight>
                      <span class={cn('text-base mt-1')}>
                        {bio.value.occupation}
                      </span>
                    </HomePageSection.Highlight>

                    <p
                      class={cn(
                        'text-lg my-5 text-editor-fg',
                      )}
                    >
                      I'm an experienced software engineer
                      who constantly seeks out innovative
                      solutions to everyday problems.
                    </p>

                    <p class={cn('text-lg text-editor-fg')}>
                      After numerous years in this industry
                      I have worked with multiple front-end
                      and back-end technologies.
                    </p>
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
                    <div>
                      <HomePageSection.Highlight>
                        <span
                          class={cn(
                            'pl-2 border-l-2 border-current',
                          )}
                        >
                          Languages
                        </span>
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
                    </div>

                    <Contacts class={cn('mt-5')} />
                  </div>

                  <div
                    class={cn(
                      'flex gap-2 p-8 border border-editor-background-secondary rounded-2xl flex-1 ml-auto',
                    )}
                  >
                    <div class={cn('size-28 bg-white rounded-3xl flex items-center justify-center shrink-0')}>
                      <img
                        src={
                          bio.value.collegeDegree.uniLogoUrl
                        }
                        alt=""
                        role="presentation"
                        class={cn('size-[90%]')}
                      />
                    </div>

                    <div class={cn('flex flex-col ml-5')}>
                      <span class={cn('text-xl font-medium mb-1')}>
                        {bio.value.collegeDegree.major}
                      </span>

                      <HomePageSection.Highlight>
                        <span>
                          {
                            bio.value.collegeDegree
                              .university
                          }
                        </span>
                      </HomePageSection.Highlight>
                    </div>
                  </div>
                </div>
              </div>
            ),
          }}
        </HomePageSection>
      );
    };
  },
});
