import { NuxtIcon } from '#components';

export default defineComponent({
  name: 'EditorFooter',
  props: {
    class: {
      type: String,
      default: '',
    },
  },

  setup(props) {
    return () => (
      <footer
        class={cn(
          'flex border-t-2 border-editor-border text-editor-fg space-x-1 relative bg-editor-background',
          props.class,
        )}
      >
        <button
          class={cn(
            'py-1 px-2 bg-primary-muted hover:bg-editor-background-secondary transition text-white',
          )}
        >
          <NuxtIcon
            name="codicon:remote"
            class={cn('size-4.5')}
          />
        </button>

        <button
          class={cn(
            'py-1 px-2 flex items-center hover:bg-editor-background-secondary transition',
          )}
        >
          <NuxtIcon
            name="codicon:source-control"
            class={cn('size-4.5')}
          />

          <span class={cn('ml-1 text-sm')}>main*</span>
        </button>

        <button
          class={cn(
            'py-1 px-2 flex items-center hover:bg-editor-background-secondary transition',
          )}
        >
          <NuxtIcon
            name="codicon:cloud-upload"
            class={cn('size-5')}
          />
        </button>

        <button
          class={cn(
            'py-1 px-1.5 flex items-center space-x-1 hover:bg-editor-background-secondary transition mr-auto',
          )}
        >
          <NuxtIcon
            name="codicon:error"
            class={cn('size-4')}
          />

          <span class={cn('text-sm ml-1')}>0</span>

          <NuxtIcon
            name="codicon:warning"
            class={cn('size-4')}
          />

          <span class={cn('text-sm ml-1')}>0</span>
        </button>

        <button
          class={cn(
            'py-1 px-2 flex items-center hover:bg-editor-background-secondary transition text-sm',
          )}
        >
          Spaces: 2
        </button>

        <button
          class={cn(
            'py-1 px-2 flex items-center hover:bg-editor-background-secondary transition text-sm',
          )}
        >
          UTF-8
        </button>

        <button
          class={cn(
            'py-1 px-2 flex items-center hover:bg-editor-background-secondary transition text-sm',
          )}
        >
          CRLF
        </button>

        <button
          class={cn(
            'py-1 px-2 flex items-center hover:bg-editor-background-secondary transition text-sm',
          )}
        >
          <NuxtIcon
            name="codicon:json"
            class={cn('size-4')}
          />

          <span class={cn('text-sm ml-1')}>
            TypeScript JSX
          </span>
        </button>

        <button
          class={cn(
            'py-1 px-2 flex items-center hover:bg-editor-background-secondary transition text-sm',
          )}
        >
          <NuxtIcon
            name="codicon:broadcast"
            class={cn('size-4')}
          />

          <span class={cn('text-sm ml-1')}>
            Go Live
          </span>
        </button>

        <button
          class={cn(
            'py-1 px-2 flex items-center hover:bg-editor-background-secondary transition mr-2',
          )}
        >
          <NuxtIcon
            name="codicon:bell-dot"
            class={cn('size-5')}
          />
        </button>
      </footer>
    );
  },
});
