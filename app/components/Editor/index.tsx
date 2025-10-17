import {
  EditorTopBar,
  EditorFooter,
  EditorSidebar,
  EditorTabsList,
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
            'h-screen max-h-screen [--editor-top-bar-height:calc(var(--spacing)*12.5)] [--editor-footer-height:calc(var(--spacing)*7.5)] [--editor-body-height:calc(100vh-var(--editor-top-bar-height)-var(--editor-footer-height))] [--editor-body-tabs-list-height:calc(var(--spacing)*12)] [--editor-body-content-height:calc(var(--editor-body-height)-var(--editor-body-tabs-list-height))]',
            props.class,
          )}
        >
          <EditorTopBar
            class={cn(
              'w-full col-span-full h-[var(--editor-top-bar-height)]',
            )}
          />

          <div
            class={cn(
              'h-[var(--editor-body-height)] max-h-[var(--editor-body-height)] flex',
            )}
          >
            <EditorSidebar class={cn('h-full')} />

            <div class={cn('flex flex-col flex-1 h-full')}>
              <EditorTabsList class={cn('h-[var(--editor-body-tabs-list-height)]')} />

              <main
                class={cn(
                  'break-words h-[var(--editor-body-content-height)] overflow-auto text-white',
                )}
              >
                {slots.default?.()}
              </main>
            </div>
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
