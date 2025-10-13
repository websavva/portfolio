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
            'h-screen max-h-screen [--editor-top-bar-height:calc(var(--spacing)*12.5)] [--editor-footer-height:calc(var(--spacing)*7.5)] [--editor-body-height:calc(100vh-var(--editor-top-bar-height)-var(--editor-footer-height))]',
            props.class,
          )}
        >
          <EditorTopBar
            class={cn(
              'w-full col-span-full h-[var(--editor-top-bar-height)]',
            )}
          />

          <div class={cn('h-[var(--editor-body-height)] max-h-[var(--editor-body-height)] flex')}>
            <EditorSidebar class={cn('h-full')} />

            <main
              class={cn(
                'flex-1 break-words h-full overflow-auto',
              )}
            >
              {slots.default?.()}
            </main>
          </div>

          <EditorFooter
            class={cn(
              'w-full col-span-full h-[var(--editor-footer-height)]',
            )}
          />
        </div>
      );
    };
  },
});
