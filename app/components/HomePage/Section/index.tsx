import { Fragment } from 'vue';

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
  | 'white'
  | 'primary'
  | 'indigo'
  ;

const colorsMap: Record<Color, string> = {
  green: '[--section-color:var(--color-green-400)]',
  blue: '[--section-color:var(--color-blue-400)]',
  purple: '[--section-color:var(--color-purple-300)]',
  red: '[--section-color:var(--color-red-300)]',
  orange: '[--section-color:var(--color-orange-300)]',
  yellow: '[--section-color:var(--color-yellow-200)]',
  gray: '[--section-color:var(--color-gray-400)]',
  white: '[--section-color:var(--color-white-400)]',
  primary: '[--section-color:var(--color-primary)]',  
  indigo: '[--section-color:var(--color-indigo-400)]',
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

    subtitle: {
      type: Array as PropType<
        | {
            text: string;
            isHighlighted: boolean;
          }[]
        | null
      >,
      default: null,
    },
  },

  setup(props, { slots }) {
    const colorClass = computed(() => {
      return colorsMap[props.color];
    });

    return () => {
      return (
        <Container
          class={cn('py-16 max-sm:py-10 [--card-color:var(--section-color)]', colorClass.value, props.class)}
        >
          <SectionDelimiter />

          <header class={cn('flex items-center mt-15 max-sm:mt-10')}>
            <motion.div
              class={cn(
                'size-7 mr-5 text-[var(--section-color)] brightness-125 rounded-full relative after:content-[""] after:absolute after:top-0 after:left-0 after:size-full after:shadow-[2px_2px_25px_var(--section-color)] max-md:after:shadow-[2px_2px_8px_var(--section-color)] after:blur-[15px]',
              )}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1 }}
              inViewOptions={{
                margin: '0px 0px -150px',
                once: true,
              }}
            >
              <NuxtIcon
                name={props.iconName}
                class={cn('size-full')}
              />
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9 }}
              inViewOptions={{
                margin: '0px 0px -150px',
                once: true,
              }}
              class={cn('text-2xl')}
            >
              {slots.title?.()}
            </motion.h2>
          </header>

          <motion.h3
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            inViewOptions={{
              margin: '0px 0px -150px',
              once: true,
            }}
            class={cn(
              'text-5xl font-medium mt-10 max-sm:text-4xl max-sm:mt-5',
              props.class,
            )}
          >
            {props.subtitle?.length
              ? props.subtitle.map((item) => {
                  const Component = item.isHighlighted
                    ? HomePageSectionHighlight
                    : 'span';

                  return (
                    <Fragment key={item.text}>
                      <Component key={item.text}>
                        {item.text}
                      </Component>{' '}
                    </Fragment>
                  );
                })
              : slots.subtitle?.()}
          </motion.h3>

          <div class={cn('mt-18 max-sm:mt-15')}>{slots.default?.()}</div>
        </Container>
      );
    };
  },
});

const HomePageSectionHighlight = defineComponent({
  name: 'HomePageSectionHighlight',

  props: {
    class: {
      type: String,
      default: '',
    },
  },

  setup(props, { slots }) {
    return () => {
      return (
        <span
          class={cn(
            'text-[var(--section-color)]',
            props.class,
          )}
        >
          {slots.default?.()}
        </span>
      );
    };
  },
});

HomePageSection.Highlight = HomePageSectionHighlight;

export default HomePageSection;
