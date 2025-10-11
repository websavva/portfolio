import { ref, computed } from 'vue';
import {
  type I18nContext,
  type I18nLocale,
  type I18nDictionary,
  i18nLocalesLoaders,
} from '#i18n';

export const createI18nContext = (
  initialLocale: I18nLocale,
  initialDictionary: I18nDictionary,
): I18nContext => {
  const locale: I18nContext['locale'] = ref(initialLocale);

  const loadedDictionaries = ref({
    [initialLocale]: initialDictionary,
  } as unknown as I18nContext['loadedDictionaries']);

  const dictionary: I18nContext['dictionary'] = computed(
    () => {
      return loadedDictionaries.value[locale.value];
    },
  );

  return {
    locale,
    loadedDictionaries,
    dictionary,

    t: (key) => {
      const propPath = key.split('.');

      let currentPropValue: any = dictionary.value;

      for (const propName of propPath) {
        currentPropValue = currentPropValue[propName];
      }

      return currentPropValue as string;
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
