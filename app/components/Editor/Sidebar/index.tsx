import {
  EditorSidebarNav,
  EditorSidebarExplorer,
} from '#components';

export default defineComponent({
  name: 'EditorSidebar',

  props: {
    class: {
      type: String,
      default: '',
    },
  },

  setup(props) {
    const { isSidebarOpen } = useSidebarToggler();

    return () => {
      return (
        <aside class={cn('flex', props.class)}>
          <EditorSidebarNav class={cn('h-full')} />

          <EditorSidebarExplorer
            v-show={isSidebarOpen.value}
            class={cn(
              'h-full w-[300px] border-r-2 border-editor-border',
            )}
          />
        </aside>
      );
    };
  },
});
