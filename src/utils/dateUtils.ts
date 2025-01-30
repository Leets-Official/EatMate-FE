import dayjs from 'dayjs';

export const formatMeetingDate = (date: string) => {
  return dayjs(date).format('YYYY-MM-DDTHH:mm:ss');
};

export const extractMinutes = (isoString: string | null): number => {
  if (!isoString) return 10;

  const date = new Date(isoString);
  if (isNaN(date.getTime())) return 10;

  return date.getMinutes();
};
