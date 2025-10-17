export default defineComponent({
  name: 'Container',

  props: {
    class: {
      type: String,
      default: '',
    },
  },

  setup(props, { slots }) {
    return () => {
      return (
        <div
          class={cn(
            '[--container-width:calc(var(--spacing)*256)] max-w-[var(--container-width)] w-full mx-auto',
            props.class,
          )}
        >
          {slots.default?.()}
        </div>
      );
    };
  },
});
