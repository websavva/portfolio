import type { InternalApi } from 'nitropack/types';

export const usePages = () => {
  const $nuxtApp = useNuxtApp();

  return computed({
    get: () => {
      return $nuxtApp.payload
        .pages as InternalApi['/api/pages']['get'];
    },

    set: (newVal) => {
      $nuxtApp.payload.pages = newVal;
    },
  });
};
