import { CV } from '#components';
import { type I18nLocale, isAvailableLocale } from '#i18n';

export default defineComponent({
  name: 'CvPage',

  async setup() {
    const $route = useRoute();
    const { setLocale } = useI18n();

    provideBio();

    if (!isAvailableLocale($route.params.locale)) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Not Found',
      });
    }

    await setLocale($route.params.locale as I18nLocale);

    return () => (
      <div>
        <CV />
      </div>
    );
  },
});
