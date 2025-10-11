import { EditorTopBar, EditorFooter } from '#components';

export default defineComponent({
  name: 'Editor',

  props: {
    class: {
      type: String,
      default: '',
    },
  },
  setup(props, { slots }) {
    return () => {
      return (
        <div class={cn('flex flex-col h-screen', props.class)}>
          <EditorTopBar class={cn('w-full')} />

          <div class={cn('flex-1')}>{slots.default?.()}</div>

          <EditorFooter class={cn('w-full')} />
        </div>
      );
    };
  },
});
