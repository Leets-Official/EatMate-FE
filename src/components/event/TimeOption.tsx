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

const Wrapper = styled.div`
  margin: 20px 0;
`;

const PickerWrapper = styled.div`
  display: flex;
  gap: 16px;
  width: 100%;
`;

const DatePickerWrapper = styled.div`
  flex: 2;
`;

const TimePickerWrapper = styled.div`
  flex: 1;
`;
const TimeOption: React.FC = () => {
  const now = new Date();
  const [selectedDate, setSelectedDate] = useState<string>('오늘');

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
        dates.push(`${date.getDate()}일`);
      }
    }
    return dates;
  };

  const dates = createDates();

  // 시간 배열 생성 (현재 시간 +30분 이후부터)
  const createHours = () => {
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    const startHour = currentMinute >= 30 ? currentHour + 1 : currentHour; // 30분 기준
    const hours = [];

    for (let i = 0; i < 24; i++) {
      const hour = (startHour + i) % 24;
      hours.push(hour === 0 ? '00' : hour.toString());
    }

    return hours;
  };

  const hours = createHours();

  // 분 배열 생성 (10분 단위)
  const createMinutes = () => {
    const currentMinute = now.getMinutes();
    const startMinute = Math.ceil((currentMinute + 30) / 10) * 10; // 현재 시간 +30분을 반올림
    const minutes: string[] = [];

    for (let i = 0; i < 6; i++) {
      const minute = (startMinute + i * 10) % 60;
      minutes.push(minute === 0 ? '00' : minute.toString());
    }

    return minutes;
  };

  const minutes = createMinutes();

  const [selectedHour, setSelectedHour] = useState<string | number>(hours[0]);
  const [selectedMinute, setSelectedMinute] = useState<string>(minutes[0]);

  return (
    <Wrapper>
      <Container>
        <Label>약속 시간</Label>
        <SelectedTime>
          {selectedDate} {selectedHour}시 {selectedMinute}분
        </SelectedTime>
      </Container>
      <PickerWrapper>
        <DatePickerWrapper>
          {/* 날짜 선택 */}
          <TimePicker
            options={dates}
            defaultValue={dates[0]}
            onChange={setSelectedDate}
            isWide
          />
        </DatePickerWrapper>
        {/* 시간 선택 */}
        <TimePickerWrapper>
          <TimePicker
            options={hours}
            defaultValue={hours[0]}
            onChange={setSelectedHour}
          />
        </TimePickerWrapper>
        {/* 분 선택 */}
        <TimePickerWrapper>
          <TimePicker
            options={minutes}
            defaultValue={minutes[0]}
            onChange={setSelectedMinute}
          />
        </TimePickerWrapper>
      </PickerWrapper>
    </Wrapper>
  );
};

export default TimeOption;
