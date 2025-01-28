import dayjs from 'dayjs';

export const formatMeetingDate = (date: string) => {
  return dayjs(date).format('YYYY-MM-DDTHH:mm:ss');
};

export const formatDateTime = (date: string): string => {
  return dayjs(date).format('MM/DD HH:mm');
};
