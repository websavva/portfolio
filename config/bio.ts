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

  skills: [
    {
      name: 'TypeScript',
      icon: 'logos:typescript-icon',
      type: 'Frontend',
    },
    {
      name: 'Stylus',
      icon: 'material-icon-theme:stylus',
      type: 'Frontend',
    },
    {
      name: 'Sass',
      icon: 'logos:sass',
      type: 'Frontend',
    },
    {
      name: 'Tailwind CSS',
      icon: 'logos:tailwindcss-icon',
      type: 'Frontend',
    },
    {
      name: 'Docker',
      icon: 'logos:docker-icon',
      type: 'Deployment',
    },
    {
      name: 'React',
      icon: 'logos:react',
      type: 'Frontend',
    },
    {
      name: 'Next.js',
      icon: 'material-icon-theme:next',
      type: 'Frontend',
    },
    {
      name: 'Vue',
      icon: 'logos:vue',
      type: 'Frontend',
    },
    {
      name: 'Nuxt',
      icon: 'logos:nuxt-icon',
      type: 'Frontend',
    },
    {
      name: 'Socket.io',
      icon: 'logos:socket-io',
      type: 'Backend',
    },
    {
      name: 'Github Actions',
      icon: 'logos:github-actions',
      type: 'Deployment',
    },
    {
      name: 'Bash',
      icon: 'logos:bash-icon',
      type: 'Tools'
    },
    {
      name: 'Git',
      icon: 'logos:git-icon',
      type: 'Tools',
    },
    {
      name: 'PostgreSQL',
      icon: 'logos:postgresql',
      type: 'Backend',
    },
    {
      name: 'Turborepo',
      icon: 'material-icon-theme:turborepo',
      type: 'Tools',
    },
    {
      name: 'Node.js',
      icon: 'logos:nodejs-icon',
      type: 'Backend',
    },
    {
      name: 'Vite',
      icon: 'logos:vitejs',
      type: 'Testing',
    },
    {
      name: 'Vitest',
      icon: 'logos:vitest',
      type: 'Testing',
    },
    {
      name: 'Playwright',
      icon: 'logos:playwright',
      type: 'Testing',
    },
    {
      name: 'Jest',
      icon: 'logos:jest',
      type: 'Testing',
    },
    {
      name: 'Eslint',
      icon: 'logos:eslint',
      type: 'Tools',
    },
    {
      name: 'Webpack',
      icon: 'logos:webpack',
      type: 'Tools',
    },
    {
      name: 'Stripe',
      icon: 'logos:stripe',
      type: 'Tools',
    },
    {
      name: 'Postman',
      icon: 'logos:postman',
      type: 'Tools',
    },
    {
      name: 'tRPC',
      icon: 'logos:trpc',
      type: 'Backend',
    },
    {
      name: 'Express.js',
      icon: 'logos:express',
      inverted: true,
      type: 'Backend',
    },
    {
      name: 'Drizzle ORM',
      icon: 'logos:drizzle',
      type: 'Backend',
    }
  ],
};
