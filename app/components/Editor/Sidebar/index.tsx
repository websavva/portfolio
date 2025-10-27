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
          <EditorSidebarNav class={cn('h-full border-r border-editor-border')} />

          <EditorSidebarExplorer
            v-show={isSidebarOpen.value}
            class={cn(
              'h-full w-75 border-r-2 border-editor-border max-lg:fixed max-lg:top-[var(--editor-top-bar-height)] max-lg:left-14 max-xs:left-12 bg-editor-background max-lg:z-50 max-lg:h-[var(--editor-body-height)]',
            )}
          />
        </aside>
      );
    };
  },
});
