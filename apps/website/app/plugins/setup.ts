import type { I18nLocale } from '#i18n';

export default defineNuxtPlugin({
  env: {
    islands: false,
  },

  async setup() {
    const $i18n = useI18n();

    const pages = usePages();
    const localeFetch = useRequestFetch();

    async function loadPages(locale: I18nLocale) {
      const loadedPages = await localeFetch('/api/pages', {
        query: {
          locale,
        },
      });
      pages.value = loadedPages;
    }

    if (import.meta.server) {
      await loadPages($i18n.locale.value);
    } else {
      watch(
        () => $i18n.locale.value,
        (newLocale) => {
          loadPages(newLocale);
        },
      );
    }
  },
});
