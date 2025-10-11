export default defineComponent({
  name: 'EditorTopBarNav',

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
        <nav
          class={cn(
            'flex items-center',
            props.class,
          )}
        >
          {$t('topBar.menu').map((name) => {
            return (
              <button
                key={name}
                class={cn(
                  'text-editor-fg hover:bg-editor-background-secondary transition-colors cursor-default px-2 py-1 rounded-md',
                )}
              >
                {name}
              </button>
            );
          })}
        </nav>
      );
    };
  },
});
