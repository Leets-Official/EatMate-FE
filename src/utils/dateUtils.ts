import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import 'dayjs/locale/ko';

dayjs.extend(customParseFormat);
dayjs.locale('ko');

export const formatMeetingDate = (date: string) => {
  return dayjs(date).format('YYYY-MM-DDTHH:mm:ss');
};

export const formatDateTime = (date: string): string => {
  return dayjs(date).format('MM/DD HH:mm');
};

export const extractMinutes = (isoString: string | null): number => {
  if (!isoString) return 10;

  const date = new Date(isoString);
  if (isNaN(date.getTime())) return 10;

  return date.getMinutes();
};

export const formatTimeWithMeridiem = (dateTimeString: string): string => {
  // '오후/오전 n시 n분' 형식으로 포맷팅
  return dayjs(dateTimeString).format('A h시 m분');
};
