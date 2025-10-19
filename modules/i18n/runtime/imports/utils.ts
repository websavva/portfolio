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

export type FlattenI18nWord<D> = D extends I18nWord
  ? D[I18nLocale]
  : D extends Record<string, any>
  ? {
      [K in keyof D]: FlattenI18nWord<D[K]>;
    }
  : D;

export function flattenI18nWord<D>(
  value: D,
  locale: I18nLocale,
): FlattenI18nWord<D> {
  let result: any;
  
  if (isI18nWord(value)) {
    result = value[locale];
  } else if (Array.isArray(value)) {
    result = value.map((item) =>
      flattenI18nWord(item, locale),
    );
  } else if (typeof value === 'object' && value !== null) {
    result = Object.fromEntries(
      Object.entries(value).map(([key, value]) => [
        key,
        flattenI18nWord(value, locale),
      ]),
    );
  } else {
    result = value;
  }

  return result;
}
