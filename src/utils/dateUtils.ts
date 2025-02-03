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
  const date = new Date(dateTimeString);
  const hour = date.getHours();
  const minute = date.getMinutes();
  const meridiem = hour >= 12 ? '오후' : '오전';
  const formattedHour = hour % 12 === 0 ? 12 : hour % 12;

  const timeString =
    minute === 0 ? `${formattedHour}시` : `${formattedHour}시 ${minute}분`;

  return `${meridiem} ${timeString}`;
};
