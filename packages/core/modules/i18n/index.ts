import { isAbsolute } from 'node:path';

import {
  defineNuxtModule,
  addTemplate,
  createResolver,
  addPlugin,
  addImportsDir,
  updateRuntimeConfig,
} from '@nuxt/kit';

import type { ModuleOptions } from './types';

declare module '@nuxt/schema' {
  interface RuntimeConfig {
    i18n: ModuleOptions;
  }
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'i18n',
    configKey: 'i18n',
  },

  setup(options, nuxt) {
    const { resolve } = createResolver(import.meta.url);

    updateRuntimeConfig({
      i18n: options,
    });

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

        const typesPath = resolve('./runtime/types.ts');

        return [
          `import type { ObjectKeyPaths } from '${typesPath}';`,
          `export * from '${typesPath}';`,
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

    const nitroTypesPath = resolve(
      './runtime/nitro/types.d.ts',
    );

    nuxt.hook('nitro:prepare:types', ({ references }) => {
      references.push({
        path: nitroTypesPath,
      });
    });

    nuxt.hook('prepare:types', ({ references }) => {
      references.push({
        path: nitroTypesPath,
      });
    });

    nuxt.hook('nitro:config', (nitroConfig) => {
      if (!nitroConfig.handlers) nitroConfig.handlers = [];

      nitroConfig.handlers.unshift({
        handler: resolve('./runtime/nitro/middleware.ts'),
        middleware: true,
      });
    });
  },
});
