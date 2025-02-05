import { useState, useEffect } from 'react';
import dayjs from 'dayjs';

const useRemainingTime = (targetTime: string) => {
  const [remainingTime, setRemainingTime] = useState('');

  useEffect(() => {
    const calculateRemainingTime = () => {
      const now = dayjs();
      const dueDate = dayjs(targetTime);
      const diff = dueDate.diff(now, 'second');

      if (diff > 0) {
        const hours = Math.floor(diff / 3600);
        const minutes = Math.floor((diff % 3600) / 60);
        const seconds = diff % 60;

        if (hours > 0) {
          setRemainingTime(
            `${hours.toString().padStart(2, '0')}시간 ${minutes.toString().padStart(2, '0')}분`
          );
        } else {
          setRemainingTime(
            `${minutes.toString().padStart(2, '0')}분 ${seconds.toString().padStart(2, '0')}초`
          );
        }
      } else {
        setRemainingTime('시간이 만료되었습니다');
      }
    };

    const timer = setInterval(calculateRemainingTime, 1000);
    return () => clearInterval(timer);
  }, [targetTime]);

  return remainingTime;
};

export default useRemainingTime;
