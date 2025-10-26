import { HomePageSection, NuxtIcon } from '#components';

export default defineComponent({
  name: 'HomePageSkills',

  props: {
    class: {
      type: String,
      default: '',
    },
  },

  setup(props) {
    const bio = useBio();
    const content = useCurrentPageContent();

    const allSkillTypes = computed(() => {
      return Object.keys(
        bio.value.skills.groups,
      ) as (keyof typeof bio.value.skills.list)[];
    });

    const selectedSkillType = ref<
      keyof typeof bio.value.skills.list | null
    >(allSkillTypes.value[0]!);

    const filteredSkills = computed(() => {
      return selectedSkillType.value
        ? bio.value.skills.list[selectedSkillType.value]
        : [];
    });

    return () => {
      return (
        <HomePageSection
          class={props.class}
          iconName="codicon:book"
          color="yellow"
          subtitle={content.value.skills.subtitle}
        >
          {{
            title: () => content.value.skills.title,
            default: () => (
              <div class={cn('flex flex-col gap-8')}>
                {/* Skill Type Selector */}
                <div
                  class={cn(
                    'flex flex-wrap gap-3 justify-center max-xs:justify-start',
                    'p-2 max-xs:p-3',
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
                          'px-5 py-2.5 rounded-xl cursor-pointer max-xs:px-3 max-xs:py-1',
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
                        {bio.value.skills.groups[type]}
                      </button>
                    );
                  })}
                </div>

                {/* Skills Grid */}
                <motion.ul
                  key={selectedSkillType.value || 'default'}
                  initial="hidden"
                  whileInView="visible"
                  exit="exit"
                  inViewOptions={{
                    margin: '0px 0px -150px',
                  }}
                  variants={{
                    hidden: { opacity: 0 },
                    visible: {
                      opacity: 1,
                      transition: {
                        staggerChildren: 0.05,
                        delayChildren: 0.1,
                      },
                    },
                    exit: {
                      opacity: 0,
                      transition: {
                        staggerChildren: 0.03,
                        staggerDirection: -1,
                      },
                    },
                  }}
                  class={cn(
                    'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5',
                  )}
                >
                  {filteredSkills.value.map((skill) => (
                    <motion.li
                      key={skill.name}
                      variants={{
                        hidden: { opacity: 0, y: 20 },
                        visible: { opacity: 1, y: 0 },
                        exit: { opacity: 0, y: -20 },
                      }}
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
                    </motion.li>
                  ))}
                </motion.ul>
              </div>
            ),
          }}
        </HomePageSection>
      );
    };
  },
});
