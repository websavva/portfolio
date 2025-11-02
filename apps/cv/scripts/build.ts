import {pathToFileURL} from 'node:url'

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
    overrides: {
      // @ts-expect-error
      _generate: true,
      nitro: {
        static: true,
      },
    },
  });

  await buildNuxt(nuxt);
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  const indexHtmlPath = resolve('../.output/public/index.html');

  await page.goto(pathToFileURL(indexHtmlPath).toString());

  await page.pdf({
    path: resolve('../.output/public/cv.pdf'),
    format: 'A4',
    margin: {
      top: '20px',
      left: '20px',
      right: '20px',
      bottom: '20px',
    },
  });
  await browser.close();
}

build();
