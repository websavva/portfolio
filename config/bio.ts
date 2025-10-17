import { defineI18nWord } from '#imports';

export const bioConfig = {
  fullName: defineI18nWord({
    en: process.env.WS_PUBLIC_BIO_FULL_NAME_EN!,
    ru: process.env.WS_PUBLIC_BIO_FULL_NAME_RU!,
  }),

  birthDate: process.env.WS_PUBLIC_BIRTH_DATE!,
  careerStartDate: process.env.WS_PUBLIC_CAREER_START_DATE!,

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
      code: 'en',
      name: defineI18nWord({
        en: 'English',
        ru: 'Английский',
      }),
      level: defineI18nWord({
        en: 'Native',
        ru: 'Родной',
      }),
    },
    {
      code: 'ru',
      name: defineI18nWord({
        en: 'Russian',
        ru: 'Русский',
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
  },
};
