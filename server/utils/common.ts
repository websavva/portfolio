import { defaultLocale, availableLocales } from '#i18n';

export function getPageSelectionParamsFromQuery(
  query: Record<string, any>,
) {
  const { path = '/', locale = defaultLocale } = query;

  const normalizedLocale = availableLocales.includes(
    locale as any,
  )
    ? locale
    : defaultLocale;

  return {
    path,
    locale: normalizedLocale,
  };
}

export function getPageDictionaryPath(
  path: string,
  locale: string,
) {
  return `${path}/locales/${locale}`.replace(/^\//, '');
}
