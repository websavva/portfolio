import { defineI18nWord } from '#imports';

export const bioConfig = {
  fullName: defineI18nWord({
    en: process.env.WS_PUBLIC_BIO_FULL_NAME_EN!,
    ru: process.env.WS_PUBLIC_BIO_FULL_NAME_RU!,
  }),

  birthDate: process.env.WS_PUBLIC_BIO_BIRTH_DATE!,
  careerStartDate:
    process.env.WS_PUBLIC_BIO_CAREER_START_DATE!,

  occupation: defineI18nWord({
    en: 'Frontend Developer',
    ru: 'Frontend Разработчик',
  }),

  isLookingForJob: true,

  socialLinks: [
    {
      name: 'Telegram',
      url: process.env.WS_PUBLIC_BIO_SOCIAL_LINK_TELEGRAM!,
      icon: 'logos:telegram',
    },
    {
      name: 'GitHub',
      url: process.env.WS_PUBLIC_BIO_SOCIAL_LINK_GITHUB!,
      icon: 'codicon:github-inverted',
    },
  ],

  languages: [
    {
      code: 'ru',
      name: defineI18nWord({
        en: 'Russian',
        ru: 'Русский',
      }),
      level: defineI18nWord({
        en: 'Native',
        ru: 'Родной',
      }),
    },
    {
      code: 'en',
      name: defineI18nWord({
        en: 'English',
        ru: 'Английский',
      }),
      level: defineI18nWord({
        en: 'Advanced',
        ru: 'Продвинутый',
      }),
    },
  ],

  collegeDegree: {
    major: defineI18nWord({
      en: 'B.S in Business Informatics',
      ru: 'Бакалавр - Бизнес-Информатика',
    }),
    university: defineI18nWord({
      en: 'Saint-Petersburg State University',
      ru: 'Санкт-Петербургский государственный университет',
    }),
    uniLogoUrl: '/uni-logo.svg',
  },

  jobExperience: [
    {
      position: defineI18nWord({
        en: 'Middle Frontend Developer',
        ru: 'Middle Frontend Разработчик',
      }),
      company: defineI18nWord({
        en: 'Studwork',
        ru: 'Студворк',
      }),
      companyImageUrl:
        'https://c5mdnuiqw2.a.trbcdn.net/img/og-image.png',

      url: 'https://studwork.ru',

      timerange: {
        start: '2021-10-01',
        end: null,
      },

      responsibilities: [
        defineI18nWord({
          en: 'TypeScript integration',
          ru: 'Внедрения TypeScript',
        }),
        defineI18nWord({
          en: 'Migration from Nuxt2 to Nuxt3 and Nuxt4',
          ru: 'Миграция c Nuxt2 на Nuxt3 и Nuxt4',
        }),
        defineI18nWord({
          en: 'Monorepo splitting into small modules, distributed across different domains, within a monorepo',
          ru: 'Разделение монолита на небольшие модули, раскиданные по разным доменам, в рамках монорепозитория',
        }),
        defineI18nWord({
          en: 'Finding and fixing vulnerabilities in the code (XSS, CSP and etc.)',
          ru: 'Поиск и исправление уязвимостей в коде (XSS, CSP и тд)',
        }),
        defineI18nWord({
          en: 'Code optimization using Lighthouse',
          ru: 'Оптимизация кода с использованием Lighthouse',
        }),
        defineI18nWord({
          en: 'Writing unit and E2E tests',
          ru: 'Написание юнит и E2E тестов',
        }),
      ],
    },
    {
      position: defineI18nWord({
        en: 'Middle Frontend Developer',
        ru: 'Middle Frontend Разработчик',
      }),
      timerange: {
        start: '2023-06-01',
        end: null,
      },
      company: defineI18nWord({
        en: 'Work24',
        ru: 'Ворк24',
      }),
      companyImageUrl:
        'https://7jv3twknu4.a.trbcdn.net/img/og-image.png',

      url: 'https://work24.ru',

      responsibilities: [
        defineI18nWord({
          en: 'Adaptation of existing business logic',
          ru: 'Адаптация существующей бизнес-логики',
        }),
        defineI18nWord({
          en: 'Setting up CI/CD using Github Actions',
          ru: 'Настройка CI/СD с использованием Github Actions',
        }),
        defineI18nWord({
          en: 'Writing unit and E2E tests',
          ru: 'Написание юнит и E2E тестов',
        }),
        defineI18nWord({
          en: 'Code reviews',
          ru: 'Проведение ревью кода',
        }),
      ],
    },
  ],

  skills: {
    groups: {
      frontend: defineI18nWord({
        en: 'Frontend',
        ru: 'Фронтенд',
      }),
      backend: defineI18nWord({
        en: 'Backend',
        ru: 'Бэкенд',
      }),
      testing: defineI18nWord({
        en: 'Testing',
        ru: 'Тестирование',
      }),
      tools: defineI18nWord({
        en: 'Tools',
        ru: 'Инструменты',
      }),
      deployment: defineI18nWord({
        en: 'Deployment',
        ru: 'Деплой',
      }),
    },

    list: {
      frontend: [
        {
          name: 'TypeScript',
          icon: 'logos:typescript-icon',
        },
        {
          name: 'Stylus',
          icon: 'material-icon-theme:stylus',
        },
        {
          name: 'Sass',
          icon: 'logos:sass',
        },
        {
          name: 'Tailwind CSS',
          icon: 'logos:tailwindcss-icon',
        },
        {
          name: 'React',
          icon: 'logos:react',
        },
        {
          name: 'Next.js',
          icon: 'material-icon-theme:next',
        },
        {
          name: 'Vue',
          icon: 'logos:vue',
        },
        {
          name: 'Nuxt',
          icon: 'logos:nuxt-icon',
        },
        {
          name: 'Pinia',
          icon: 'logos:pinia',
        },
        {
          name: 'Vuex',
          icon: 'material-icon-theme:vuex-store',
        },
        {
          name: 'Zod',
          icon: 'logos:zod',
        },
        {
          name: 'Axios',
          icon: 'logos:axios',
        },
        {
          name: 'Chart.js',
          icon: 'logos:chartjs',
        },
      ],
      backend: [
        {
          name: 'PostgreSQL',
          icon: 'logos:postgresql',
        },
        {
          name: 'Node.js',
          icon: 'logos:nodejs-icon',
        },
        {
          name: 'tRPC',
          icon: 'logos:trpc',
        },
        {
          name: 'Express.js',
          icon: 'logos:express',
          inverted: true,
        },
        {
          name: 'Nginx',
          icon: 'logos:nginx',
        },
        {
          name: 'Drizzle ORM',
          icon: 'logos:drizzle',
        },
        {
          name: 'Socket.io',
          icon: 'logos:socket-io',
        },
      ],
      tools: [
        {
          name: 'Bash',
          icon: 'logos:bash-icon',
        },
        {
          name: 'Git',
          icon: 'logos:git-icon',
        },
        {
          name: 'GitHub',
          icon: 'codicon:github-inverted',
        },
        {
          name: 'Turborepo',
          icon: 'material-icon-theme:turborepo',
        },
        {
          name: 'i18n',
          icon: 'material-icon-theme:i18n',
        },
        {
          name: 'Eslint',
          icon: 'logos:eslint',
        },
        {
          name: 'Prettier',
          icon: 'logos:prettier',
        },
        {
          name: 'Esbuild',
          icon: 'material-icon-theme:esbuild',
        },
        {
          name: 'Webpack',
          icon: 'logos:webpack',
        },
        {
          name: 'Vite',
          icon: 'logos:vitejs',
        },
        {
          name: 'Stripe',
          icon: 'logos:stripe',
        },
        {
          name: 'Bitcoin',
          icon: 'logos:bitcoin',
        },
        {
          name: 'Postman',
          icon: 'logos:postman',
        },
        {
          name: 'Google Recaptcha',
          icon: 'logos:recaptcha',
        },
        {
          name: 'Yarn',
          icon: 'logos:yarn',
        },
        {
          name: 'pnpm',
          icon: 'logos:pnpm',
        },
      ],
      testing: [
        {
          name: 'Vitest',
          icon: 'logos:vitest',
        },
        {
          name: 'Playwright',
          icon: 'logos:playwright',
        },
        {
          name: 'Jest',
          icon: 'logos:jest',
        },
      ],
      deployment: [
        {
          name: 'Docker',
          icon: 'logos:docker-icon',
        },
        {
          name: 'Github Actions',
          icon: 'logos:github-actions',
        },
      ],
    },
  },
};
