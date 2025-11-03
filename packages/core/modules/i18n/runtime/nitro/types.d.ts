import { H3EventContext } from 'h3';
import type { I18nLocale, I18nDictionary } from '#i18n';

declare module 'h3' {
  interface H3EventContext {
    i18n: {
      locale: I18nLocale;
      dictionary: I18nDictionary;
    };
  }
}
