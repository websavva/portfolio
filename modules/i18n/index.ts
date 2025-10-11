import { isAbsolute } from 'node:path';

import {
  defineNuxtModule,
  addTemplate,
  createResolver,
  addPlugin,
  addImportsDir,
} from '@nuxt/kit';
import type { ModuleOptions } from './types';

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'i18n',
    configKey: 'i18n',
  },

  setup(options, nuxt) {
    const { resolve } = createResolver(import.meta.url);

    const { dst } = addTemplate({
      filename: 'i18n.ts',
      write: true,
      getContents: () => {
        const { defaultLocale, locales } = options;

        // inherring dicitionary type

        const normalizedLocales = locales.map((locale) => ({
          ...locale,
          file: isAbsolute(locale.file)
            ? locale.file
            : resolve(nuxt.options.rootDir, locale.file),
        }));

        const defaultLocalePath = normalizedLocales.find(
          (locale) => locale.code === defaultLocale,
        )!.file;

        return [
          `import type { ObjectKeyPaths } from '${resolve(
            './runtime/types.ts',
          )}';`,
          `import type { Ref, ComputedRef } from 'vue';`,
          `export type I18nDictionary = typeof import('${defaultLocalePath}');`,
          `export type I18nLocale = ${normalizedLocales
            .map(({ code }) => `'${code}'`)
            .join(' | ')};`,
          `export type I18nLocaleTranslator = (key: ObjectKeyPaths<I18nDictionary>) => string;`,
          `export const i18nLocalesLoaders: Record<I18nLocale, () => Promise<{ default: I18nDictionary }>> = {`,
          ...normalizedLocales.map(
            (locale) =>
              `'${locale.code}': () => import('${locale.file}'),`,
          ),
          '};',
          'export type I18nContext = {',
          'locale: Ref<I18nLocale>;',
          'loadedDictionaries: Ref<Record<I18nLocale, I18nDictionary>>;',
          'dictionary: ComputedRef<I18nDictionary>',
          't: I18nLocaleTranslator;',
          'setLocale(locale: I18nLocale): Promise<void>',
          '}',
          `export const defaultLocale = ${JSON.stringify(
            options.defaultLocale,
          )};`,
          `export const availableLocales = ${JSON.stringify(
            options.locales.map((locale) => locale.code),
          )};`,
        ].join('\n');
      },
    });

    nuxt.options.alias['#i18n'] = dst;

    for (const mode of ['client', 'server'] as const) {
      addPlugin({
        src: resolve(`runtime/plugin.${mode}.ts`),
        mode,
      });
    }

    addImportsDir(resolve('./runtime/imports'));
  },
});
