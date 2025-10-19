import {
  Container,
  SectionDelimiter,
  NuxtIcon,
  PrimitiveSlot,
} from '#components';

type Color =
  | 'green'
  | 'blue'
  | 'purple'
  | 'red'
  | 'orange'
  | 'yellow'
  | 'gray'
  | 'white';

const colorsMap: Record<Color, string> = {
  green: '[--section-color:var(--color-green-400)]',
  blue: '[--section-color:var(--color-blue-400)]',
  purple: '[--section-color:var(--color-purple-400)]',
  red: '[--section-color:var(--color-red-400)]',
  orange: 'bg-orange-500',
  yellow: '[--section-color:var(--color-yellow-400)]',
  gray: '[--section-color:var(--color-gray-400)]',
  white: '[--section-color:var(--color-white-400)]',
};

const HomePageSection = defineComponent({
  name: 'HomePageSection',

  props: {
    class: {
      type: String,
      default: '',
    },

    iconName: {
      type: String,
      required: true,
    },

    color: {
      type: String as PropType<Color>,
      required: true,
    },
  },

  setup(props, { slots }) {
    const colorClass = computed(() => {
      return colorsMap[props.color];
    });

    return () => {
      return (
        <Container
          class={cn('py-16', colorClass.value, props.class)}
        >
          <SectionDelimiter />

          <header class={cn('flex items-center mt-15')}>
            <motion.div
              class={cn(
                'size-7 mr-5 text-[var(--section-color)] brightness-125 rounded-full relative after:content-[""] after:absolute after:top-0 after:left-0 after:size-full after:shadow-[2px_2px_25px_var(--section-color)] after:blur-[15px]',
              )}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <NuxtIcon
                name={props.iconName}
                class={cn('size-full')}
              />
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: .9 }}
              class={cn('text-2xl')}
            >
              {slots.title?.()}
            </motion.h2>
          </header>

          <motion.h3
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: .7 }}
            class={cn(
              'text-5xl font-medium mt-10',
              props.class,
            )}
          >
            {slots.subtitle?.()}
          </motion.h3>

          <div class={cn('mt-18')}>{slots.default?.()}</div>
        </Container>
      );
    };
  },
});

const HomePageSectionHighlight = defineComponent({
  name: 'HomePageSectionHighlight',

  setup(_, { slots }) {
    return () => {
      return (
        <PrimitiveSlot
          class={cn('text-[var(--section-color)]')}
        >
          {slots.default?.()}
        </PrimitiveSlot>
      );
    };
  },
});

HomePageSection.Highlight = HomePageSectionHighlight;

export default HomePageSection;
