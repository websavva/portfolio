import {
  EditorTopBarNav,
  NuxtIcon,
  EditorTopBarLayoutActions,
  EditorTopBarWindowActions,
} from '#components';
import type { I18nLocale } from '#i18n';

const I18N_NAMES: Record<I18nLocale, string> = {
  en: process.env.WS_PUBLIC_BIO_FULL_NAME_EN!,
  ru: process.env.WS_PUBLIC_BIO_FULL_NAME_RU!,
};

export default defineComponent({
  name: 'EditorTopBar',

  props: {
    class: {
      type: String,
      default: '',
    },
  },

  setup(props) {
    const { locale } = useI18n();

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
              class={cn('size-6 mr-3')}
            />

            <EditorTopBarNav items={$t('topBar.menu')} />
          </div>

          <div
            class={cn(
              'flex-1 mx-2 flex justify-center items-center text-sm',
            )}
          >
            {formatString($t('topBar.titleTemplate'), [
              I18N_NAMES[locale.value],
            ])}
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
