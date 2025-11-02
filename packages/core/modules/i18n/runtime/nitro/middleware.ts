import {
  getRequestIP,
  type H3Event,
  getRequestHeader,
  getRequestHost,
} from 'h3';
import ip3country from 'ip3country';
import acceptLanguage from 'accept-language';
// @ts-expect-error missing types
import { getCountryLanguages } from 'country-language';
import {
  type I18nLocale,
  i18nLocalesLoaders,
  defaultLocale,
  availableLocales,
} from '#i18n';

ip3country.init();
acceptLanguage.languages(availableLocales);

const isAvailableLocale = (
  locale: unknown,
): locale is I18nLocale =>
  availableLocales.includes(locale as I18nLocale);

async function loadInitialLocale(event?: H3Event) {
  if (!event) return defaultLocale;

  const host = getRequestHost(event!, {
    xForwardedHost: true,
  });

  const [localeFromHost] = host.split('.');

  if (isAvailableLocale(localeFromHost)) {
    return localeFromHost;
  }

  const acceptLanguageHeaderValue = getRequestHeader(
    event!,
    'accept-language',
  );

  if (acceptLanguageHeaderValue) {
    const localeFromAcceptLanguage = acceptLanguage.get(
      acceptLanguageHeaderValue,
    );

    return isAvailableLocale(localeFromAcceptLanguage)
      ? localeFromAcceptLanguage
      : defaultLocale;
  } else {
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
}

export default defineEventHandler(async (event) => {
  const initialLocale = await loadInitialLocale(event);

  const initialDictionary = await i18nLocalesLoaders[
    initialLocale
  ]().then((r) => r.default);

  event.context.i18n = {
    locale: initialLocale,
    dictionary: initialDictionary,
  };
});
