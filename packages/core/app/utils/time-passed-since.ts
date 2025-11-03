export const IN_SECOND = 1000;
export const IN_YEAR = 31536000 * IN_SECOND;
export const IN_MONTH = IN_YEAR / 12;

export const IN_MINUTE = 60 * IN_SECOND;
export const IN_HOUR = 60 * IN_MINUTE;
export const IN_DAY = 24 * IN_HOUR;

function dateUpdater(initDate: Date | number) {
  let date = initDate;
  return (newDateVal = 0) => {
    date = +date - newDateVal;
    return date;
  };
}

export function timePassedSince(
  date: Date | string | number,
) {
  date = new Date(date);

  const dateDiff = dateUpdater(Date.now() - +date);

  const yearsPassed = Math.floor(dateDiff() / IN_YEAR);
  const monthsPassed = Math.floor(
    dateDiff(yearsPassed * IN_YEAR) / IN_MONTH,
  );
  const daysPassed = Math.floor(
    dateDiff(monthsPassed * IN_MONTH) / IN_DAY,
  );
  const hoursPassed = Math.floor(
    dateDiff(daysPassed * IN_DAY) / IN_HOUR,
  );
  const minutesPassed = Math.floor(
    dateDiff(hoursPassed * IN_HOUR) / IN_MINUTE,
  );

  return {
    years: yearsPassed,
    months: monthsPassed,
    days: daysPassed,
    hours: hoursPassed,
    minutes: minutesPassed,
  };
}
