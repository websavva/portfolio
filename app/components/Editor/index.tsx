import { EditorTopBar, NuxtIcon } from '#components';

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
        <div class={cn('flex flex-col', props.class)}>
          <EditorTopBar class={cn('w-full')} />

          {slots.default?.()}
        </div>
      );
    };
  },
});
