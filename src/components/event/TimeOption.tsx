import React, { useState } from 'react';
import TimePicker from './TimePicker'; // TimePicker 컴포넌트를 가져옴

const TimeOption: React.FC = () => {
  const now = new Date();
  const [selectedDate, setSelectedDate] = useState<string>('오늘');
  const [selectedHour, setSelectedHour] = useState<number>(now.getHours());
  const [selectedMinute, setSelectedMinute] = useState<number>(
    (Math.ceil((now.getMinutes() + 30) / 10) * 10) % 60
  );
  // 날짜 배열 생성 (오늘 ~ +7일)
  const createDates = () => {
    const dates: string[] = [];
    for (let i = 0; i < 8; i++) {
      const date = new Date(now);
      date.setDate(now.getDate() + i);
      if (i === 0) {
        dates.push('오늘');
      } else if (i === 1) {
        dates.push('내일');
      } else {
        dates.push(
          `${date.getMonth() + 1}.${date.getDate()} (${date.toLocaleDateString(
            'ko-KR',
            { weekday: 'short' }
          )})`
        );
      }
    }
    return dates;
  };

  const dates = createDates();

  const createHours = () => {
    const startHour =
      now.getMinutes() >= 30 ? now.getHours() + 1 : now.getHours();
    return Array.from({ length: 24 - startHour }, (_, i) => startHour + i);
  };

  const hours = createHours();

  // 분 배열 생성 (10분 단위)
  const minutes = Array.from({ length: 6 }, (_, i) =>
    i * 10 === 0 ? '00' : i * 10
  );

  return (
    <div>
      <h3>약속 시간</h3>
      <div style={{ display: 'flex', gap: '16px' }}>
        {/* 날짜 선택 */}
        <TimePicker
          options={dates}
          defaultValue={dates[0]}
          onChange={setSelectedDate}
        />
        {/* 시간 선택 */}
        <TimePicker
          options={hours}
          defaultValue={selectedHour}
          onChange={setSelectedHour}
        />
        {/* 분 선택 */}
        <TimePicker
          options={minutes}
          defaultValue={selectedMinute}
          onChange={setSelectedMinute}
        />
      </div>
      <p>
        선택된 시간: {selectedDate} {selectedHour}시 {selectedMinute}분
      </p>
    </div>
  );
};

export default TimeOption;
