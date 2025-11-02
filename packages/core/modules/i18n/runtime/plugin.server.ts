import { defineNuxtPlugin, useRequestEvent } from '#app';

import { createI18nContext } from './imports';

export default defineNuxtPlugin(async (nuxtApp) => {
  const event = useRequestEvent();

  nuxtApp.payload.i18n = event!.context.i18n;

  return {
    provide: {
      i18n: createI18nContext(
        event!.context.i18n.locale,
        event!.context.i18n.dictionary,
      ),
    },
  };
});
