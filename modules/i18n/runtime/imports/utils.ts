import type { I18nLocale } from '#i18n';

const __I18N_WORD_SYMBOL__ = Symbol(
  'i18n-local-dictionary',
);

export type I18nWord = Record<I18nLocale, string>;

export const defineI18nWord = (word: I18nWord) => {
  Object.defineProperty(word, __I18N_WORD_SYMBOL__, {
    value: true,
    writable: false,
    configurable: false,
  });

  return word;
};

export const isI18nWord = (
  word: unknown,
): word is I18nWord => {
  return Boolean(
    word &&
      typeof word === 'object' &&
      Object.hasOwn(word, __I18N_WORD_SYMBOL__),
  );
};

export type FlattenI18nWord<D extends Record<string, any>> =
  {
    [K in keyof D]: D[K] extends I18nWord
      ? D[K][I18nLocale]
      : D[K] extends Record<string, any>
      ? FlattenI18nWord<D[K]>
      : D[K];
  };

export function flattenI18nWord<
  D extends Record<string, any>,
>(obj: D, locale: I18nLocale): FlattenI18nWord<D> {
  return Object.fromEntries(
    Object.entries(obj).map(([key, value]) => {
      if (isI18nWord(value)) {
        return [key, value[locale]];
      } else if (Array.isArray(value)) {
        return [
          key,
          value.map((item) =>
            flattenI18nWord(item, locale),
          ),
        ];
      } else if (
        typeof value === 'object' &&
        value !== null
      ) {
        return [key, flattenI18nWord(value, locale)];
      } else {
        return [key, value];
      }
    }),
  ) as FlattenI18nWord<D>;
}
