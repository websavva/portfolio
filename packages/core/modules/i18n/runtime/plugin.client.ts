import { defineNuxtPlugin } from '#app';
import type { I18nDictionary, I18nLocale } from '#i18n';

import { createI18nContext } from './imports';

export default defineNuxtPlugin((nuxtApp) => {
  const { locale, dictionary } = nuxtApp.payload.i18n as {
    locale: I18nLocale;
    dictionary: I18nDictionary;
  };

  return {
    provide: {
      i18n: createI18nContext(locale, dictionary),
    },
  };
});
