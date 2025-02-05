import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import 'dayjs/locale/ko';
import { addMinutes, format } from 'date-fns';

dayjs.extend(customParseFormat);
dayjs.locale('ko');

export const formatMeetingDate = (date: string) => {
  return dayjs(date).format('YYYY-MM-DDTHH:mm:ss');
};

export const formatDateTime = (date: string): string => {
  return dayjs(date).format('MM/DD HH:mm');
};

export const formatTime = (date: string): string => {
  return dayjs(date).format('HH:mm');
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

export const formatOrderDeadline = (minutes: number): string => {
  const now = new Date(); // 현재 날짜 및 시간
  const futureDate = addMinutes(now, minutes); // 현재 시간에 minutes 추가
  return format(futureDate, "yyyy-MM-dd'T'HH:mm:ss"); // ISO 형식 변환
};

export const calculateTimeAgo = (datetime: string) => {
  const date = new Date(datetime);
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  let interval = seconds / 31536000;

  if (interval > 1) {
    return `${Math.floor(interval)}년 전`;
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return `${Math.floor(interval)}개월 전`;
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return `${Math.floor(interval)}일 전`;
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return `${Math.floor(interval)}시간 전`;
  }
  interval = seconds / 60;
  if (interval > 1) {
    return `${Math.floor(interval)}분 전`;
  }
  return `${Math.floor(seconds)}초 전`;
};
