import { defineNuxtPlugin, useRequestEvent } from '#app';
import { getRequestIP, type H3Event } from 'h3';
import ip3country from 'ip3country';
// @ts-expect-error missing types
import { getCountryLanguages } from 'country-language';

import {
  type I18nLocale,
  type I18nDictionary,
  i18nLocalesLoaders,
  defaultLocale,
  availableLocales,
} from '#i18n';

import { createI18nContext } from './imports';

ip3country.init();

async function loadInitialLocale(
  event?: H3Event,
): Promise<I18nLocale> {
  if (!event) return defaultLocale;

  const ipAddress = getRequestIP(event!, {
    xForwardedFor: true,
  });

  if (!ipAddress) return defaultLocale;

  const countryCode = ip3country.lookupStr(ipAddress);

  if (!countryCode) return defaultLocale;

  const locale = await new Promise<I18nLocale | null>(
    (resolve) => {
      getCountryLanguages(
        countryCode,
        (err: any, languages: any) => {
          if (err) {
            console.error(err);

            resolve(null);
          } else {
            const countryLanguageCodes = languages.map(
              (language: any) => language.iso639_1,
            );

            debugger;

            const countryLocale =
              availableLocales.find((locale) =>
                countryLanguageCodes.includes(locale),
              ) || null;

            resolve(countryLocale as I18nLocale | null);
          }
        },
      );
    },
  );

  return locale || defaultLocale;
}

export default defineNuxtPlugin(async (nuxtApp) => {
  const event = useRequestEvent();

  const initialLocale = await loadInitialLocale(event);

  const initialDictionary = await i18nLocalesLoaders[
    initialLocale
  ]().then((r) => r.default);

  nuxtApp.payload.i18n = {
    initialLocale,
    initialDictionary,
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
