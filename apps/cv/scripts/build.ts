import { pathToFileURL } from 'node:url';
import { mkdir, rmdir } from 'node:fs/promises';

import {
  loadNuxt,
  buildNuxt,
  createResolver,
} from '@nuxt/kit';
import puppeteer from 'puppeteer';

async function build() {
  const { resolve } = createResolver(import.meta.url);

  const nuxt = await loadNuxt({
    configFile: 'nuxt.config.ts',
    dotenv: {
      cwd: resolve('../../..'),
    },
    overrides: {
      // @ts-expect-error missing types
      _generate: true,
      nitro: {
        static: true,
      },
    },
  });

  await buildNuxt(nuxt);

  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await rmdir(resolve('../docs'), {
    recursive: true,
  }).catch(() => {});

  await mkdir(resolve('../docs'), { recursive: true });

  // @ts-expect-error missing types
  for (const { code } of nuxt.options.runtimeConfig.i18n
    .locales) {
    const indexHtmlPath = resolve(
      `../.output/public/${code}/index.html`,
    );

    await page.goto(
      pathToFileURL(indexHtmlPath).toString(),
    );

    // Get page height to calculate scale
    const { height, width } = await page.evaluate(() => {
      const { scrollHeight: height, offsetWidth: width } =
        document.getElementById('cv')!;

      return {
        height,
        width,
      };
    });
    await page.pdf({
      path: resolve(`../docs/${code}.pdf`),
      width,
      height,
    });
  }
  await browser.close();
}

build();
