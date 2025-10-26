import { NuxtIcon } from '#components';

export default defineComponent({
  name: 'EditorSidebarNav',
  props: {
    class: {
      type: String,
      default: '',
    },
  },

  setup(props) {
    const { isSidebarOpen, toggleSidebar } =
      useSidebarToggler();

    const menuItems = computed(() => {
      return [
        {
          iconName: 'codicon:files',
          isActive: isSidebarOpen.value,
          onClick: toggleSidebar,
        },
        {
          iconName: 'codicon:search',
          class: '-scale-x-[1]',
        },
        {
          iconName: 'codicon:source-control',
        },
        {
          iconName: 'codicon:debug-alt',
        },
        {
          iconName: 'codicon:extensions',
        },
        {
          iconName: 'codicon:account',
          class: 'mt-auto',
        },
        {
          iconName: 'codicon:settings-gear',
        },
      ];
    });

    return () => {
      return (
        <nav class={cn('flex flex-col', props.class)}>
          {menuItems.value.map((item) => {
            return (
              <button
                key={item.iconName}
                class={cn(
                  'flex items-center border-l-2 border-l-transparent p-3 opacity-60 hover:opacity-100 transition text-editor-fg cursor-pointer',
                  item.class,
                  {
                    'border-l-current opacity-100':
                      item.isActive,
                  },
                )}
                onClick={item.onClick}
              >
                <NuxtIcon
                  name={item.iconName}
                  class={cn('size-8 max-xs:size-7')}
                />
              </button>
            );
          })}
        </nav>
      );
    };
  },
});
