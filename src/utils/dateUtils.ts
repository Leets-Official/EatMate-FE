import dayjs from 'dayjs';

export const formatMeetingDate = (date: string) => {
  return dayjs(date).format('YYYY-MM-DDTHH:mm:ss');
};
