import {
  EditorTopBarNav,
  NuxtIcon,
  EditorTopBarLayoutActions,
  EditorTopBarWindowActions,
} from '#components';

export default defineComponent({
  name: 'EditorTopBar',

  props: {
    class: {
      type: String,
      default: '',
    },
  },

  setup(props) {
    const $t = useI18nTranslation();

    return () => {
      return (
        <header
          class={cn(
            'flex items-center border-editor-border border-b-2 text-editor-fg',
            props.class,
          )}
        >
          <div class={cn('flex items-center p-2')}>
            <NuxtIcon
              name="devicon:vscode"
              class={cn('size-7 mr-3')}
            />

            <EditorTopBarNav items={$t('topBar.menu')} />
          </div>

          <div
            class={cn(
              'flex-1 mx-2 flex justify-center items-center text-sm',
            )}
          >
            {$t('topBar.title')}
          </div>

          <EditorTopBarLayoutActions
            class={cn('py-2 px-1')}
          />

          <EditorTopBarWindowActions class={cn('h-full')} />
        </header>
      );
    };
  },
});
