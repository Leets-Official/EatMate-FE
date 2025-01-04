export const validateYear = (year: string): string | true => {
  if (!/^\d{4}$/.test(year)) return '올바른 년도를 입력해주세요.';
  const yearNumber = +year;
  const currentYear = new Date().getFullYear();
  if (yearNumber < 1900 || yearNumber > currentYear)
    return '올바른 년도를 입력해주세요.';
  return true;
};

export const validateMonth = (month: string): string | true => {
  if (!/^\d{1,2}$/.test(month)) return '1에서 12 사이의 숫자를 입력해주세요.';
  const monthNumber = +month;
  if (monthNumber < 1 || monthNumber > 12)
    return '1에서 12 사이의 숫자를 입력해주세요.';
  return true;
};

export const validateDay = (
  day: string,
  year: string,
  month: string
): string | true => {
  if (!/^\d{1,2}$/.test(day)) return '1에서 31 사이의 숫자를 입력해주세요.';
  const daysInMonth = new Date(+year, +month, 0).getDate();
  const dayNumber = +day;
  if (dayNumber < 1 || dayNumber > daysInMonth)
    return '1에서 31 사이의 숫자를 입력해주세요.';
  return true;
};
