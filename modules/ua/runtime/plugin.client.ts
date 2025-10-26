import type { Ua } from './imports/types';

export default defineNuxtPlugin((nuxtApp) => {
  return {
    provide: {
      ua: nuxtApp.payload.ua as Ua,
    },
  };
});
