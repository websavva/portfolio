import {
  HomePageSection,
  SectionDelimiter,
  NuxtIcon,
} from '#components';

export default defineComponent({
  name: 'HomePageSkills',

  props: {
    class: {
      type: String,
      default: '',
    },
  },

  setup(props) {
    const { locale } = useI18n();

    const bio = useBio();
    const dictionary = useCurrentPageDictionary();

    const allSkillTypes = computed(() => {
      return [
        ...new Set(
          bio.value.skills.map((skill) => skill.type),
        ),
      ];
    });

    const selectedSkillType = ref<string | null>(
      allSkillTypes.value[0]!,
    );

    const filteredSkills = computed(() => {
      return bio.value.skills.filter((skill) => {
        return skill.type === selectedSkillType.value;
      });
    });

    return () => {
      return (
        <HomePageSection
          class={props.class}
          iconName="codicon:book"
          color="yellow"
          subtitle={dictionary.value.skills.subtitle}
        >
          {{
            title: () => dictionary.value.skills.title,
            default: () => (
              <div class={cn('flex flex-col gap-8')}>
                {/* Skill Type Selector */}
                <div
                  class={cn(
                    'flex flex-wrap gap-3 justify-center',
                    'p-2',
                    'bg-editor-background-secondary/40',
                    'rounded-2xl',
                  )}
                >
                  {allSkillTypes.value.map((type) => {
                    const isActive =
                      selectedSkillType.value === type;

                    return (
                      <button
                        key={type}
                        onClick={() => {
                          selectedSkillType.value = type;
                        }}
                        class={cn(
                          'px-5 py-2.5 rounded-xl cursor-pointer',
                          'text-sm font-medium',
                          'transition-all duration-200 ease-out',
                          'capitalize',
                          {
                            'bg-primary-500/90': isActive,
                            'bg-editor-background-tertiary/40 text-white/50':
                              !isActive,
                            'hover:bg-editor-background-tertiary/60 hover:text-gray-200':
                              !isActive,
                          },
                        )}
                      >
                        {type}
                      </button>
                    );
                  })}
                </div>

                {/* Skills Grid */}
                <ul
                  class={cn(
                    'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5',
                  )}
                >
                  {filteredSkills.value.map((skill) => (
                    <li
                      key={skill.name}
                      class={cn(
                        'group relative',
                        'flex flex-col items-center gap-4',
                        'p-6',
                        'bg-editor-background-secondary/40',
                        'backdrop-blur-sm',
                        'rounded-2xl',
                        'border border-editor-border/30',
                        'transition-all duration-300 ease-out',
                        'hover:bg-editor-background-secondary/60',
                        'hover:border-primary-400/40',
                        'hover:-translate-y-1',
                        'hover:shadow-xl hover:shadow-primary-500/5',
                        'cursor-default',
                      )}
                    >
                      {/* Subtle top highlight */}
                      <div
                        class={cn(
                          'absolute top-0 left-1/2 -translate-x-1/2',
                          'w-12 h-0.5',
                          'bg-gradient-to-r from-transparent via-primary-400/0 to-transparent',
                          'group-hover:via-primary-400/60',
                          'transition-all duration-300',
                          'rounded-full',
                        )}
                      />

                      <NuxtIcon
                        name={skill.icon}
                        class={cn(
                          'size-14',
                          'transition-all duration-300',
                          'group-hover:scale-110',
                          'text-gray-300 group-hover:text-primary-300',
                          {
                            '*:fill-current':
                              skill.inverted,
                          },
                        )}
                      />

                      <span
                        class={cn(
                          'text-sm font-medium text-center',
                          'text-gray-400',
                          'group-hover:text-gray-200',
                          'transition-colors duration-300',
                        )}
                      >
                        {skill.name}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ),
          }}
        </HomePageSection>
      );
    };
  },
});
