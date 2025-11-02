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
            '[--container-width:calc(var(--spacing)*256)] max-xl:[--container-width:calc(var(--spacing)*200)] max-lg:[--container-width:calc(var(--spacing)*180)] max-md:[--container-width:100%] max-w-[var(--container-width)] w-full mx-auto max-md:px-16 max-xs:px-[5vw]',
            props.class,
          )}
        >
          {slots.default?.()}
        </div>
      );
    };
  },
});
