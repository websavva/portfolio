import { NuxtIcon } from '#components';

export default defineComponent({
  name: 'EditorTopBarWindowActions',

  props: {
    class: {
      type: String,
      default: '',
    },
  },

  setup(props) {
    const actions = [
      {
        iconName: 'codicon:chrome-minimize',
      },
      {
        iconName: 'codicon:chrome-restore',
      },
      {
        iconName: 'codicon:chrome-close',
        class: 'hover:bg-red-500 hover:text-white',
        onClick: () => {
          window.close();
        },
      },
    ];

    return () => {
      return (
        <div class={cn('flex', props.class)}>
          {actions.map((action) => {
            return (
              <button
                key={action.iconName}
                onClick={action.onClick}
                class={cn(
                  'p-3 hover:bg-editor-background-secondary transition flex items-center justify-center',
                  {
                    'cursor-pointer': action.onClick,
                  },
                  action.class,
                )}
              >
                <NuxtIcon
                  name={action.iconName}
                  class={cn('size-4')}
                />
              </button>
            );
          })}
        </div>
      );
    };
  },
});
