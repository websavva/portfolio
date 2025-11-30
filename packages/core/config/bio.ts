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

  position: defineI18nWord({
    en: 'Senior Frontend Developer',
    ru: 'Senior Frontend Разработчик',
  }),

  isLookingForJob: true,

  email: process.env.WS_PUBLIC_BIO_EMAIL!,
  phoneNumber: process.env.WS_PUBLIC_BIO_PHONE_NUMBER!,
  location: defineI18nWord({
    en: process.env.WS_PUBLIC_BIO_LOCATION_EN!,
    ru: process.env.WS_PUBLIC_BIO_LOCATION_RU!,
  }),

  socialLinks: [
    {
      name: 'GitHub',
      url: process.env.WS_PUBLIC_BIO_SOCIAL_LINK_GITHUB!,
      icon: 'codicon:github-inverted',
    },
    {
      name: 'Telegram',
      url: process.env.WS_PUBLIC_BIO_SOCIAL_LINK_TELEGRAM!,
      icon: 'logos:telegram',
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
    timerange: {
      start: '2017-09-01',
      end: '2021-06-01',
    },

    major: defineI18nWord({
      en: 'B.S in Business Informatics',
      ru: 'Бакалавр - Бизнес-Информатика',
    }),
    university: defineI18nWord({
      en: 'Saint-Petersburg State University',
      ru: 'Санкт-Петербургский государственный университет',
    }),
    uniLogoUrl: '/uni-logo.svg',

    description: defineI18nWord({
      en: 'Specialized in software development, database management, and information systems. Gained comprehensive knowledge in business process modeling, enterprise architecture, and modern web technologies.',
      ru: 'Специализация в разработке программного обеспечения, управлении базами данных и информационных систем. Получил комплексные знания в моделировании бизнес-процессов, корпоративной архитектуре и современных веб-технологиях.',
    }),

    url: 'https://diploma.spbu.ru/s/?rn=2011114&bd=19990221&h=b4eec686154e479e9ca261c9c29010f5',
  },

  jobExperience: [
    {
      position: defineI18nWord({
        en: 'Middle/Senior Frontend Developer',
        ru: 'Middle/Senior Frontend Разработчик',
      }),
      company: defineI18nWord({
        en: 'Studwork',
        ru: 'Студворк',
      }),
      companyImageUrl: '/studwork.png',

      url: 'https://studwork.ru',

      timerange: {
        start: '2021-10-01',
        end: '2024-05-30',
      },

      responsibilities: [
        defineI18nWord({
          en: 'Monolith splitting into monorepo and microservices + migration to Nuxt3/4. For application scaling and logic reuse in other applications.',
          ru: 'Разделение монолита в монорепо и микросервисы + миграция на Nuxt3/4. Для масштабирования приложения и переиспользования логики в других приложениях.',
        }),
        defineI18nWord({
          en: 'Migration from Nuxt2 to Nuxt3 and Nuxt4',
          ru: 'Разработка и внедрение новых разделов приложения (ИИ-помощник, Портфолио, Журнал, История изменений)',
        }),
        defineI18nWord({
          en: 'Cross-browser SSR-friendly landing pages development and optimization of them for SEO using Lighthouse (Accessibility, Image Optimization, etc.)',
          ru: 'Кроссбраузерная верстка лендингов c учетом SSR и их оптимизация для SEO с использованием Lighthouse (Accessibility, Image Optimization, etc.)',
        }),
        defineI18nWord({
          en: 'Finding and fixing vulnerabilities in the code (XSS, CSP, CORS, Cookies Flags, Access Control List and etc.)',
          ru: 'Поиск и исправление уязвимостей в коде (XSS, CSP, CORS, Cookies Flags, Access Control List и т.д.)',
        }),
        defineI18nWord({
          en: 'Creating and maintaining a development stand for CI/CD via Telegram Bot',
          ru: 'Создание и поддержка девстенда для CI/CD через Telegram Bot',
        }),
        defineI18nWord({
          en: 'Writing unit and E2E tests',
          ru: 'Написание юнит и E2E тестов',
        }),
        defineI18nWord({
          en: 'Reworking of all 120 modal windows of the application and introduction of a new approach to work with modal windows through the Promise API',
          ru: 'Переработка всех 120 модальных окон приложения и внедрение нового подхода работы с модальными окнами через Promise API',
        }),
        defineI18nWord({
          en: 'Introduction of animated charts and tables using Chart.js',
          ru: 'Внедрение анимированных графиков и таблиц с использованием Chart.js',
        }),
        defineI18nWord({
          en: 'Introduction of animation using Vue Transition and Animation API',
          ru: 'Внедрение анимации с использованием Vue Transition и Animation API',
        }),
      ],
    },
    {
      position: defineI18nWord({
        en: 'Senior Frontend Developer',
        ru: 'Senior Frontend Разработчик',
      }),
      timerange: {
        start: '2024-06-01',
        end: null,
      },
      company: defineI18nWord({
        en: 'Work24',
        ru: 'Ворк24',
      }),
      companyImageUrl: '/work24.png',

      url: 'https://work24.ru',

      responsibilities: [
        defineI18nWord({
          en: 'Adaptation and reuse of existing business logic of Studwork through microservices and Nuxt modules',
          ru: 'Адаптация и переиспользование существующей бизнес-логики Студворка через микросервисы и Nuxt модули',
        }),
        defineI18nWord({
          en: 'Development of new features and improvements, oriented on freelance exchange (Transfer of contact data, Freelancer Directory)',
          ru: 'Разработка новых функций и фич, ориентированных на фриланс биржу (Передача контактных данных, Справочник фрилансера) ',
        }),
        defineI18nWord({
          en: 'Setting up CI/CD using Github Actions and Docker',
          ru: 'Настройка CI/СD с использованием Github Actions и Docker',
        }),
        defineI18nWord({
          en: 'Writing unit and E2E tests',
          ru: 'Написание юнит и E2E тестов',
        }),
        defineI18nWord({
          en: 'Reworking of the approach to working with third-party analytics services (Google Analytics, Yandex Metrica, etc.) based on OOP',
          ru: 'Переработка подхода к работе со сторонними сервисами аналитики (Google Analytics, Yandex Metrica, etc.) на основе ООП',
        }),
        defineI18nWord({
          en: "Introduction of Drag'n Drop for managing the order of elements in lists",
          ru: "Внедрение Drag'n Drop для управление порядком отображения элементов в списках",
        }),
        defineI18nWord({
          en: 'Code reviews',
          ru: 'Проведение ревью кода',
        }),
        defineI18nWord({
          en: 'Introduction of progressive hydration for page loading acceleration',
          ru: 'Внедрение прогрессивной гидратации для ускорения загрузки страниц',
        }),
        defineI18nWord({
          en: 'Form validation using Vuelidate',
          ru: 'Валидация форм с использованием Vuelidate',
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
      devOps: defineI18nWord({
        en: 'DevOps',
        ru: 'DevOps',
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
          name: 'Styled Components',
          icon: 'local:styled-components',
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
          name: 'Redux',
          icon: 'logos:redux',
        },
        {
          name: 'Zustand',
          icon: 'local:zustand',
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
          name: 'Vuelidate',
          icon: 'logos:vue',
        },
        {
          name: 'VueUse',
          icon: 'logos:vueuse',
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
        {
          name: 'Lighthouse',
          icon: 'logos:lighthouse',
        },
        {
          name: 'Bugsnag',
          icon: 'logos:bugsnag',
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
        {
          name: 'React Testing Library',
          icon: 'local:react-testing-library',
        },
      ],
      devOps: [
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
