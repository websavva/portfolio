import type { InternalApi } from 'nitropack/types';

export type Pages = InternalApi['/api/pages']['get'];

export type Page = Pages[number];

export const usePages = () => {
  const $nuxtApp = useNuxtApp();

  return computed({
    get: () => {
      return $nuxtApp.payload.pages as Pages;
    },

    set: (newVal) => {
      $nuxtApp.payload.pages = newVal;
    },
  });
};
