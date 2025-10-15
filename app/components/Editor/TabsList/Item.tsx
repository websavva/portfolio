import { NuxtIcon, NuxtLink } from '#components';

export default defineComponent({
  name: 'EditorTabsListItem',

  props: {
    class: {
      type: String,
      default: '',
    },

    path: {
      type: String,
      required: true,
    },

    isActive: {
      type: Boolean,
      default: false,
    },

    iconName: {
      type: String,
      required: true,
    },

    name: {
      type: String,
      required: true,
    },
  },

  emits: {
    delete: (path: string) => true,
  },

  setup(props, { emit }) {
    return () => {
      return (
        <NuxtLink
          href={props.path}
          class={cn(
            'flex items-center border-b-2 border-b-transparent px-2 pt-2 pb-2.5 group whitespace-nowrap',
            {
              'border-b-primary-muted': props.isActive,
            },
            props.class,
          )}
        >
          <NuxtIcon
            name={`material-icon-theme:${props.iconName}`}
            class={cn('size-5 mr-2')}
          />

          <span
            class={cn({
              'text-primary': props.isActive,
            })}
          >
            {props.name}
          </span>

          <button
            class={cn(
              'ml-2 p-[calc(var(--spacing)*0.8)] hover:bg-editor-background-secondary rounded-md cursor-pointer opacity-0 group-hover:opacity-100',
              {
                'opacity-100': props.isActive,
              },
            )}
            onClick={withModifiers(
              () => emit('delete', props.path),
              ['stop', 'prevent'],
            )}
          >
            <NuxtIcon
              name="codicon:close"
              class={cn('size-4.5')}
            />
          </button>
        </NuxtLink>
      );
    };
  },
});
