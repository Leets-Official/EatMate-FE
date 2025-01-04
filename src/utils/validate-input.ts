{
  /* 생년월일 */
}
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

{
  /* 전화번호 */
}
export const formatPhoneNumber = (value: string) => {
  const cleaned = value.replace(/\D+/g, ''); // 숫자만 남김
  const match = cleaned.match(/^(\d{3})(\d{0,4})(\d{0,4})$/); // 전화번호 형태로 포맷팅
  if (match) {
    return [match[1], match[2], match[3]].filter(Boolean).join('-');
  }
  return value;
};

export const validatePhoneNumber = (value: string) => {
  const numericValue = value.replace(/-/g, '');
  return numericValue.length === 11;
};
