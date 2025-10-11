import { useNuxtApp } from '#app';

export * from './context';

export const useI18n = () => {
  return useNuxtApp().$i18n;
};

export const useI18nTranslation = () => {
  return useI18n().t;
};
