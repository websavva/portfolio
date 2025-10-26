import { NuxtIcon } from '#components';

export default defineComponent({
  name: 'EditorTopBarMobileSidebarToggler',

  props: {
    class: {
      type: String,
      default: '',
    },
  },

  setup(props) {
    const { toggleSidebar } = useSidebarToggler();

    return () => {
      return (
        <button
          class={cn('flex size-8', props.class)}
          onClick={toggleSidebar}
        >
          <NuxtIcon
            name="codicon:menu"
            class={cn('size-full')}
          />
        </button>
      );
    };
  },
});
