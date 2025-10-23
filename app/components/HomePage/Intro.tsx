import {
  Container,
  LetterGlitch,
  Contacts,
  NuxtIcon,
} from '#components';

export default defineComponent({
  name: 'HomePageIntro',

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
        <div
          class={cn(
            'flex items-center relative',
            props.class,
          )}
        >
          <motion.div
            class={cn(
              'absolute top-0 left-0 w-full h-full',
            )}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.2 }}
            transition={{ duration: 1 }}
          >
            <LetterGlitch
              class={cn(
                'absolute top-0 left-0 w-full h-full',
              )}
            />
          </motion.div>

          <Container class={cn('relative z-10')}>
            <div
              class={cn(
                'bg-[radial-gradient(at_50%_50%,_var(--color-editor-background)_30%,_rgba(0,0,0,0)_80%)] w-[110%] h-[200%] absolute top-[-50%] left-[-30%]',
              )}
            />

            <h1
              class={cn(
                'text-6xl font-bold flex items-center gap-2',
                'relative z-10',
              )}
            >
              <span>{bio.value.fullName}</span>

              <span
                class={cn('inline-block origin-[70%_70%]')}
              >
                👋
              </span>
            </h1>

            <div
              class={cn(
                'flex items-center gap-2 mt-5 relative z-10',
              )}
            >
              <div class={cn('flex items-baseline')}>
                {content.value.intro.lookingForJob}

                <span
                  class={cn(
                    'size-2 bg-red-500 rounded-full ml-2 relative after:content-[""] after:absolute after:top-0 after:left-0 after:size-[110%] after:bg-inherit after:opacity-70 after:rounded-full after:animate-ping after:[animation-duration:1.5s]',
                    {
                      'bg-green-500':
                        bio.value.isLookingForJob,
                    },
                  )}
                />
              </div>

              <div>/</div>

              <div class={cn('text-primary')}>
                {bio.value.occupation}
              </div>
            </div>

            <p class={cn('mt-5 max-w-2/4 relative z-10')}>
              {content.value.intro.description}
            </p>

            <Contacts class={cn('mt-5 relative z-10')} />
          </Container>

          <div
            class={cn(
              'absolute bottom-12 left-1/2 -translate-x-1/2',
            )}
          >
            {Array.from({ length: 3 }).map((_, index) => (
              <motion.div
                key={index}
                animate={{
                  opacity: [0, 1, 0],
                  y: [-15, 20],
                }}
                transition={{
                  delay: index * -0.2,
                  duration: 1.5,
                  repeat: Infinity,
                  ease: 'easeIn',
                }}
                class={cn('-my-6')}
              >
                <NuxtIcon
                  name="codicon:chevron-down"
                  class={cn('size-8')}
                />
              </motion.div>
            ))}
          </div>
        </div>
      );
    };
  },
});
