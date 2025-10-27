import { defineNuxtPlugin } from '#app';
import type { I18nDictionary, I18nLocale } from '#i18n';

import { createI18nContext } from './imports';

export default defineNuxtPlugin((nuxtApp) => {
  const { initialLocale, initialDictionary } = nuxtApp
    .payload.i18n as {
    initialLocale: I18nLocale;
    initialDictionary: I18nDictionary;
  };

  return {
    provide: {
      i18n: createI18nContext(
        initialLocale,
        initialDictionary,
      ),
    },
  };
});
