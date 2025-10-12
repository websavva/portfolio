import {
  EditorTopBar,
  EditorFooter,
  EditorSidebar,
} from '#components';

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
        <div
          class={cn(
            'h-screen max-h-screen grid grid-cols-[auto_1fr] grid-rows-[auto_1fr_auto]',
            props.class,
          )}
        >
          <EditorTopBar
            class={cn('w-full col-span-full')}
          />

          <EditorSidebar class={cn('h-full')} />

          <main
            class={cn(
              'flex-1 break-words w-full overflow-auto',
            )}
          >
            {slots.default?.()}
          </main>

          <EditorFooter
            class={cn('w-full col-span-full')}
          />
        </div>
      );
    };
  },
});
