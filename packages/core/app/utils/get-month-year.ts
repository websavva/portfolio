import type { I18nLocale } from '#i18n';

const monthNames = {
  en: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ],
  ru: [
    'Январь',
    'Февраль',
    'Март',
    'Апрель',
    'Май',
    'Июнь',
    'Июль',
    'Август',
    'Сентябрь',
    'Октябрь',
    'Ноябрь',
    'Декабрь',
  ],
} as const;

export function getMonthYear(
  rawDate: string,
  locale: I18nLocale,
) {
  const date = new Date(rawDate);
  const month = date.getMonth();
  const year = date.getFullYear();

  return `${monthNames[locale][month]} ${year}`;
}
