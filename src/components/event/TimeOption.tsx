import React, { useState } from 'react';
import TimePicker from './TimePicker';
import { Label } from '../common/Input/styles';
import styled from 'styled-components';
import { flexSpaceBetween } from '@/styles/CommonStyle';

const SelectedTime = styled.div`
  color: ${({ theme }) => theme.COLORS.main};
  font-size: ${({ theme }) => theme.FONT_SIZE.sm};
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.light};
`;

const Container = styled.div`
  ${flexSpaceBetween}
`;
const TimeOption: React.FC = () => {
  const now = new Date();
  const [selectedDate, setSelectedDate] = useState<string>('오늘');
  const [selectedHour, setSelectedHour] = useState<number>(
    now.getMinutes() >= 30 ? now.getHours() + 1 : now.getHours()
  );
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

  // 시간 배열 생성 (현재 시간 +30분 이후부터)
  const createHours = () => {
    const startHour =
      now.getMinutes() >= 30 ? now.getHours() + 1 : now.getHours();
    const hours = [];

    for (let i = 0; i < 24; i++) {
      const hour = (startHour + i) % 24;
      hours.push(hour);
    }

    return hours;
  };

  const hours = createHours();

  // 분 배열 생성 (10분 단위)
  const createMinutes = () => {
    const currentMinute = now.getMinutes();
    const startMinute = Math.ceil((currentMinute + 30) / 10) * 10;

    const minutes = [];
    for (let i = 0; i < 6; i++) {
      const minute = (startMinute + i * 10) % 60;
      minutes.push(minute === 0 ? '00' : minute);
    }

    return minutes;
  };

  const minutes = createMinutes();

  return (
    <div>
      <Container>
        <Label>약속 시간</Label>
        <SelectedTime>
          {selectedDate} {selectedHour}시 {selectedMinute}분
        </SelectedTime>
      </Container>
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
          defaultValue={minutes[0]}
          onChange={setSelectedMinute}
        />
      </div>
    </div>
  );
};

export default TimeOption;
