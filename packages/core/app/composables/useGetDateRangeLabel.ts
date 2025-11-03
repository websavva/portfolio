export function useGetDateRangeLabel() {
  const $t = useI18nTranslation();

  const { locale } = useI18n();

  return (timerange: {
    start: string;
    end: string | null;
  }) => {
    return `${getMonthYear(
      timerange.start,
      locale.value,
    )} - ${
      timerange.end
        ? getMonthYear(timerange.end, locale.value)
        : $t('now')
    }`;
  };
}
