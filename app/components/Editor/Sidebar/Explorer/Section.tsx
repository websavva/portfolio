import { NuxtIcon } from '#components';

export default defineComponent({
  name: 'EditorSidebarExplorerSection',

  props: {
    class: {
      type: String,
      default: '',
    },

    isOpen: {
      type: Boolean,
      default: false,
    },

    disabled: Boolean,
  },

  emits: {
    'update:isOpen': (value: boolean) => value,
  },

  setup(props, { slots, emit }) {
    const compIsOpen = useCompValue(emit, props, 'isOpen');

    function onToggle() {
      compIsOpen.value = !compIsOpen.value;
    }

    return () => {
      return (
        <div
          class={cn(
            'flex flex-col group transition-duration-200 *:relative *:after:content-[""] *:after:absolute *:after:top-0 *:after:left-0 *:after:w-full *:after:h-full *:after:border *:after:border-editor-fg/30 *:after:hidden *:after:pointer-events-none *:focus:after:block',
            props.class,
          )}
        >
          <div
            class={cn(
              'flex items-center py-1.5 px-0.5 h-[var(--editor-explorer-section-header-height)]',
              {
                'cursor-pointer': !props.disabled,
              },
            )}
            onClick={onToggle}
            tabindex={0}
          >
            <NuxtIcon
              name="codicon:chevron-right"
              class={cn('size-4 mr-1', {
                'rotate-90': compIsOpen.value,
              })}
            />

            <span
              class={cn(
                'text-xs uppercase font-bold mr-auto',
              )}
            >
              {slots.title?.()}
            </span>

            {slots.actions && (
              <div
                class={cn(
                  'flex items-center opacity-0 group-hover:opacity-100 group-focus-within:opacity-100',
                )}
              >
                {slots.actions?.()}
              </div>
            )}
          </div>

          <div
            class={cn(
              'h-0 transition-[height] overflow-hidden',
              {
                'h-[var(--editor-explorer-available-content-height,0)] overflow-auto [scrollbar-width:0] hide-scrollbar':
                  compIsOpen.value,
              },
            )}
            tabindex={0}
          >
            {slots.default?.()}
          </div>
        </div>
      );
    };
  },
});
