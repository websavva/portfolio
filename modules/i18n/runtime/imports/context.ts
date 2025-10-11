import { ref, computed } from 'vue';
import {
  type I18nLocale,
  type I18nDictionary,
  i18nLocalesLoaders,
  type GetI18DictionaryValueByPath,
  type ObjectKeyPaths,
} from '#i18n';

export const createI18nContext = (
  initialLocale: I18nLocale,
  initialDictionary: I18nDictionary,
) => {
  const locale = ref(initialLocale);

  const loadedDictionaries = ref({
    [initialLocale]: initialDictionary,
  } as Record<I18nLocale, I18nDictionary>);

  const dictionary = computed<I18nDictionary>(() => {
    return loadedDictionaries.value[locale.value];
  });

  return {
    locale,
    loadedDictionaries,
    dictionary,

    t: <Key extends ObjectKeyPaths<I18nDictionary>>(
      key: Key,
    ): GetI18DictionaryValueByPath<I18nDictionary, Key> => {
      const propPath = key.split('.');

      let currentPropValue: any = dictionary.value;

      for (const propName of propPath) {
        currentPropValue = currentPropValue[propName];
      }

      return currentPropValue;
    },

    setLocale: async (newLocale: I18nLocale) => {
      if (locale.value === newLocale) return;

      if (!loadedDictionaries.value[newLocale]) {
        loadedDictionaries.value[newLocale] =
          await i18nLocalesLoaders[newLocale]().then(
            (r) => r.default,
          );
      }

      locale.value = newLocale;
    },
  };
};
