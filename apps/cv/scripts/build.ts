import { mkdir, rmdir } from 'node:fs/promises';
import { createServer } from 'node:http';

import handler from 'serve-handler';
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

  const server = createServer(async (req, res) => {
    await handler(req, res, {
      public: resolve(
        nuxt.options.nitro.output!.publicDir!,
      ),
    });
  });

  await new Promise<void>((resolve) =>
    server.listen(3e3, () => resolve()),
  );

  await rmdir(resolve('../docs'), {
    recursive: true,
  }).catch(() => {});

  await mkdir(resolve('../docs'), { recursive: true });

  const browser = await puppeteer.launch({
    executablePath: process.env.PUPPETEER_EXECUTABLE_PATH,
    headless: false,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-gpu',
    ],
  });
  const page = await browser.newPage();

  // @ts-expect-error missing types
  for (const { code } of nuxt.options.runtimeConfig.i18n
    .locales) {
    await page.goto(`http://localhost:3000/${code}`);

    await page.evaluate(() => {
      return new Promise<void>((resolve) => {
        if (document.readyState === 'complete') {
          resolve();
        } else {
          window.addEventListener('load', () => resolve());
        }
      });
    });

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
  await new Promise<void>((resolve, reject) =>
    server.close((err) => (err ? reject(err) : resolve())),
  );
}

build();
