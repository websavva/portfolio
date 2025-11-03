import { createResolver } from '@nuxt/kit';

const { resolve } = createResolver(import.meta.url);

export default {
  defaultLocale: 'en',
  locales: [
    {
      code: 'ru',
      name: 'Russian',
      file: resolve('./locales/ru.json'),
    },
    {
      code: 'en',
      name: 'English',
      file: resolve('./locales/en.json'),
    },
  ],
};
