export default defineComponent({
  name: 'HomePageContactMeInput',

  inheritAttrs: false,

  props: {
    label: {
      type: String,
      required: true,
    },

    modelValue: {
      type: String,
      default: '',
    },

    id: {
      type: String,
      required: true,
    },

    class: {
      type: String,
      default: '',
    },

    type: {
      type: String as PropType<'text' | 'email'>,
      default: 'text',
    },

    maxLength: {
      type: Number,
      default: null,
    },
  },

  emits: {
    'update:modelValue': (value: string) => value,
  },

  setup(props, { emit, attrs }) {
    const compValue = useCompValue(
      emit,
      props,
    );

    return () => {
      return (
        <div
          class={cn(
            'group relative z-0 transition-all focus-within:z-10',
            props.class,
          )}
        >
          <input
            id={props.id}
            v-model={compValue.value}
            placeholder=" "
            type={props.type}
            maxlength={props.maxLength}
            required
            class={cn(
              'peer block w-full border-l-2 border-r-2 border-t-2 border-editor-background-secondary bg-transparent px-6 pb-4 pt-12 text-base/6 ring-2 ring-transparent transition focus:outline-none focus:ring-[var(--section-color)] group-first:rounded-t-2xl group-last:rounded-b-2xl group-last:border-b-2',
              'max-xs:px-3 max-xs:pb-3 max-xs:pt-8',
              props.class,
            )}
          />
          <label
            for={props.id}
            class={cn(
              'pointer-events-none absolute left-6 top-1/2 -mt-3 origin-left text-base/6 transition-all duration-200 peer-focus:-translate-y-4 peer-[:not(:placeholder-shown)]:scale-90 peer-focus:scale-90 peer-focus:font-semibold peer-focus:text-[var(--section-color)] peer-[:not(:placeholder-shown)]:-translate-y-4 peer-[:not(:placeholder-shown)]:text-[var(--section-color)]',
              'max-xs:left-4 max-xs:text-sm',
              props.class,
            )}
          >
            {props.label}
          </label>
        </div>
      );
    };
  },
});
