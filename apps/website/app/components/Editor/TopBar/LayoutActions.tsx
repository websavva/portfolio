import { NuxtIcon } from '#components';

export default defineComponent({
  name: 'EditorTopBarActions',

  props: {
    class: {
      type: String,
      default: '',
    },
  },

  setup(props) {
    const { isSidebarOpen, toggleSidebar } =
      useSidebarToggler();

    const actions = computed(() => [
      {
        id: 'sidebar-left',
        iconName: isSidebarOpen.value
          ? 'codicon:layout-sidebar-left'
          : 'codicon:layout-sidebar-left-off',
        onClick: toggleSidebar,
      },
      {
        id: 'panel',
        iconName: 'codicon:layout-panel-off',
      },
      {
        id: 'sidebar-right',
        iconName: 'codicon:layout-sidebar-right-off',
      },
    ]);

    return () => {
      return (
        <div class={cn('flex items-center', props.class)}>
          {actions.value.map((action) => {
            return (
              <button
                key={action.id}
                class={cn(
                  'text-editor-fg hover:bg-editor-background-secondary transition-colors cursor-default p-1 rounded-md',
                  {
                    'cursor-pointer': action.onClick,
                  },
                )}
                onClick={action.onClick}
              >
                <NuxtIcon
                  name={action.iconName}
                  class={cn('size-4.5')}
                />
              </button>
            );
          })}
        </div>
      );
    };
  },
});
