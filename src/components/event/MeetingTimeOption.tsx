import React, { useEffect, useState } from 'react';
import { Label } from '@/components/common/Input/styles';
import styled from 'styled-components';
import { flexSpaceBetween } from '@/styles/CommonStyle';
import TimePicker from './TimePicker';

const SelectedTime = styled.div`
  color: ${({ theme }) => theme.COLORS.main};
  font-size: ${({ theme }) => theme.FONT_SIZE.sm};
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.light};
`;

export const Container = styled.div`
  ${flexSpaceBetween}
`;

const Wrapper = styled.div`
  margin: 30px 0;
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

interface TimeOptionProps {
  value?: string;
  onChange?: (value: string) => void;
}

const MeetingTimeOption: React.FC<TimeOptionProps> = ({ value, onChange }) => {
  const now = new Date();
  const [selectedTime, setSelectedTime] = useState({
    date: '오늘',
    hour: '00',
    minute: '00',
  });

  const formattedTime = `${selectedTime.date} ${selectedTime.hour}시 ${selectedTime.minute}분`;

  useEffect(() => {
    if (onChange) {
      onChange(formattedTime);
    }
  }, [selectedTime, onChange]);

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

  // 시간 배열 생성 (현재 시간 +30분 이후부터)
  const createHours = () => {
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    const startHour = currentMinute >= 30 ? currentHour + 1 : currentHour;
    return Array.from({ length: 24 }, (_, i) => (startHour + i) % 24).map(
      (hour) => (hour < 10 ? `0${hour}` : `${hour}`)
    );
  };

  // 분 배열 생성 (10분 단위)
  const createMinutes = () => {
    const currentMinute = now.getMinutes();
    const startMinute = Math.ceil((currentMinute + 30) / 10) * 10;
    return Array.from({ length: 6 }, (_, i) => (startMinute + i * 10) % 60).map(
      (minute) => (minute < 10 ? `0${minute}` : `${minute}`)
    );
  };

  const dates = createDates();
  const hours = createHours();
  const minutes = createMinutes();

  const handleTimeChange = (key: keyof typeof selectedTime, value: string) => {
    setSelectedTime((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <Wrapper>
      <Container>
        <Label>약속 시간</Label>
        <SelectedTime>{value || formattedTime}</SelectedTime>
      </Container>
      <PickerWrapper>
        <DatePickerWrapper>
          {/* 날짜 선택 */}
          <TimePicker
            options={dates}
            defaultValue={selectedTime.date}
            onChange={(value) => handleTimeChange('date', value)}
            isWide
          />
        </DatePickerWrapper>
        {/* 시간 선택 */}
        <TimePickerWrapper>
          <TimePicker
            options={hours}
            defaultValue={selectedTime.hour}
            onChange={(value) => handleTimeChange('hour', value)}
          />
        </TimePickerWrapper>
        {/* 분 선택 */}
        <TimePickerWrapper>
          <TimePicker
            options={minutes}
            defaultValue={selectedTime.minute}
            onChange={(value) => handleTimeChange('minute', value)}
          />
        </TimePickerWrapper>
      </PickerWrapper>
    </Wrapper>
  );
};

export default MeetingTimeOption;
