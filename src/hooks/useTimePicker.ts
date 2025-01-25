import dayjs from 'dayjs';
import { useEffect, useRef, useState } from 'react';

export const useTimePicker = (onChange: (date: string) => void) => {
  // 날짜 생성 함수
  const generateDateItems = () => {
    return Array.from({ length: 7 }, (_, index) => {
      const date = dayjs().add(index, 'day');
      let label =
        index === 0 ? '오늘' : index === 1 ? '내일' : `${date.date()}일`;
      return {
        value: date.format('YYYY-MM-DD'),
        label: label,
      };
    });
  };

  // 시간 및 분 생성 함수
  const generateTimeItems = () => {
    const now = dayjs().add(30, 'minute'); // 현재 시간 기준 30분 후 설정

    const hours = Array.from({ length: 24 }, (_, i) =>
      i.toString().padStart(2, '0')
    );

    // 10분 단위로 정확한 분 생성
    const minutes = Array.from({ length: 6 }, (_, i) =>
      (i * 10).toString().padStart(2, '0')
    );

    const adjustedTime =
      now.minute() % 10 === 0
        ? now
        : now.add(10 - (now.minute() % 10), 'minute');

    return {
      hours,
      minutes,
      defaultHour: adjustedTime.format('HH'),
      defaultMinute: adjustedTime.format('mm').padStart(2, '0'),
    };
  };

  const dateItems = generateDateItems();
  const now = dayjs().add(30, 'minute');
  const defaultDate =
    now.hour() === 23 && now.minute() >= 30
      ? dateItems[1].label
      : dateItems[0].label;
  const { hours, minutes, defaultHour, defaultMinute } = generateTimeItems();

  const [selectedDate, setSelectedDate] = useState(defaultDate);
  const [selectedHour, setSelectedHour] = useState(defaultHour);
  const [selectedMinute, setSelectedMinute] = useState(defaultMinute);

  const dateRef = useRef<HTMLUListElement | null>(null);
  const hourRef = useRef<HTMLUListElement | null>(null);
  const minuteRef = useRef<HTMLUListElement | null>(null);
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    const formattedDate = dayjs()
      .hour(Number(selectedHour))
      .minute(Number(selectedMinute))
      .format('YYYY-MM-DDTHH:mm:ss');

    onChange(formattedDate);
  }, [selectedDate, selectedHour, selectedMinute]);

  useEffect(() => {
    if (dateRef.current) {
      dateRef.current.scrollTo({ top: 40 * 0, behavior: 'smooth' });
    }
    if (hourRef.current) {
      const hourIndex = hours.findIndex((h) => h === defaultHour);
      hourRef.current.scrollTo({ top: 40 * hourIndex, behavior: 'smooth' });
    }
    if (minuteRef.current) {
      const minuteIndex = minutes.findIndex((m) => m === defaultMinute);
      minuteRef.current.scrollTo({ top: 40 * minuteIndex, behavior: 'smooth' });
    }
  }, []);

  return {
    dateItems,
    hours,
    minutes,
    selectedDate,
    setSelectedDate,
    selectedHour,
    setSelectedHour,
    selectedMinute,
    setSelectedMinute,
    dateRef,
    hourRef,
    minuteRef,
  };
};
