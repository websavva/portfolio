import { EditorSidebarNav } from '#components';

export default defineComponent({
  name: 'EditorSidebar',

  props: {
    class: {
      type: String,
      default: '',
    },
  },

  setup(props) {
    return () => {
      return (
        <aside class={cn('flex flex-col', props.class)}>
          <EditorSidebarNav class={cn('h-full')} />
        </aside>
      );
    };
  },
});
