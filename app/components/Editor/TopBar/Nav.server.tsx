export default defineComponent({
  name: 'EditorTopBarNav',

  props: {
    class: {
      type: String,
      default: '',
    },

    items: {
      type: Array as PropType<string[]>,
      default: () => [],
    },
  },

  setup(props) {
    return () => {
      return (
        <nav class={cn('flex items-center', props.class)}>
          {props.items.map((name) => {
            return (
              <button
                key={name}
                class={cn(
                  'text-editor-fg hover:bg-editor-background-secondary transition-colors cursor-default px-2 py-1 rounded-md',
                )}
              >
                {name}
              </button>
            );
          })}
        </nav>
      );
    };
  },
});
