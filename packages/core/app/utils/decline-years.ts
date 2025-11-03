import plural from 'plural-ru';
import { defu } from 'defu';
import type { I18nLocale } from '#i18n';

type Case =
  | 'nominal'
  | 'genitive'
  | 'dative'
  | 'accusative'
  | 'instrumental'
  | 'prepositional';

type CasesRecord = Record<
  I18nLocale,
  | Record<
      Case,
      [string, string, string] | [string, string]
    >
  | string
>;

const defaultCases: CasesRecord = {
  en: 'years',
  ru: {
    nominal: ['год', 'года', 'лет'],
    genitive: ['года', 'годов', 'лет'],
    dative: ['году', 'годам', 'лет'],
    accusative: ['год', 'года', 'лет'],
    instrumental: ['годом', 'годами', 'лет'],
    prepositional: ['году', 'годах', 'лет'],
  },
};

export interface GetYearLabelOptions {
  case: Case;
  locale: I18nLocale;
  cases?: Partial<CasesRecord>;
}

export function declineYears(
  year: number,
  options: GetYearLabelOptions,
) {
  const normalizedCases = defu(
    options.cases,
    defaultCases,
  ) as CasesRecord;

  const caseRecords = normalizedCases[options.locale];

  if (typeof caseRecords === 'string') {
    return caseRecords;
  }

  return plural(year, ...caseRecords[options.case]);
}
