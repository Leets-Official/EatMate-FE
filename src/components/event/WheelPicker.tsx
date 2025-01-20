import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import dayjs from 'dayjs';

const generateDateItems = () => {
  return Array.from({ length: 7 }, (_, index) => {
    const date = dayjs().add(index, 'day');

    let label;
    if (index === 0) label = '오늘';
    else if (index === 1) label = '내일';
    else label = `${date.date()}일`;

    return {
      value: date.format('YYYY-MM-DD'),
      label: label,
    };
  });
};

// 현재 시간 기준으로 30분 후부터 시간을 설정하는 함수
const generateTimeItems = () => {
  const now = dayjs();
  const currentMinute = now.minute();
  const roundedMinute = Math.ceil(currentMinute / 10) * 10;
  const startTime = now.minute(roundedMinute).add(30, 'minute'); // 30분 후

  // 시간 및 분 생성 (0~23시, 00~50분)
  const hours = [];
  for (let i = startTime.hour(); i < 24; i++) {
    hours.push(i.toString().padStart(2, '0'));
  }

  const minutes = [];
  for (let m = 0; m < 60; m += 10) {
    minutes.push(m.toString().padStart(2, '0'));
  }

  return {
    hours,
    minutes,
    defaultHour: startTime.format('HH'),
    defaultMinute: startTime.format('mm'),
  };
};

// 스타일 정의
const TotalContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
`;

const PickerWrapper = styled.div`
  position: relative;
  display: flex;
  gap: 16px;
  width: 100%;
  align-items: center;

  &::before,
  &::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    height: 1px;
    background-color: ${({ theme }) => theme.COLORS.border};
    z-index: 1;
  }

  &::before {
    top: 50%;
    transform: translateY(-50px);
  }

  &::after {
    top: 50%;
    transform: translateY(50px);
  }
`;

const Items = styled.ul`
  height: 96px;
  padding: 50% 0;
  margin: 0;
  overflow-y: scroll;
  scroll-snap-type: y mandatory;
  -ms-overflow-style: none;
  scrollbar-width: none;
  text-align: center;
  font-size: ${({ theme }) => theme.FONT_SIZE.sm};
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.regular};

  &::-webkit-scrollbar {
    display: none;
  }
`;

const Item = styled.li<{ isSelected: boolean }>`
  list-style-type: none;
  height: 40px;
  line-height: 32px;
  scroll-snap-align: center;
  text-align: center;
  display: flex;
  align-items: center;
  color: ${({ isSelected, theme }) =>
    isSelected ? theme.COLORS.main : '#000'};
  font-weight: ${({ isSelected, theme }) =>
    isSelected ? theme.FONT_WEIGHT.bold : theme.FONT_WEIGHT.regular};
  background-color: ${({ isSelected, theme }) =>
    isSelected ? '#fbded08f' : 'transparent'};
  border-radius: ${({ isSelected }) => (isSelected ? '8px' : '0')};
  padding: ${({ isSelected }) => (isSelected ? '0 10px' : '0')};
  border: ${({ isSelected, theme }) =>
    isSelected ? `1px solid ${theme.COLORS.border}` : 'none'};
  transition: all 0.3s ease;

  div {
    display: inline-block;
    width: 100%;
  }
`;

const Label = styled.label`
  font-size: ${({ theme }) => theme.FONT_SIZE.md};
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.semibold};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SelectedTime = styled.div`
  color: ${({ theme }) => theme.COLORS.main};
  font-size: ${({ theme }) => theme.FONT_SIZE.sm};
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.light};
`;

const WheelPicker = () => {
  const dateItems = generateDateItems();
  const { hours, minutes, defaultHour, defaultMinute } = generateTimeItems();

  const [selectedDate, setSelectedDate] = useState(dateItems[0].label);
  const [selectedHour, setSelectedHour] = useState(defaultHour);
  const [selectedMinute, setSelectedMinute] = useState(defaultMinute);

  const dateRef = useRef<HTMLUListElement | null>(null);
  const hourRef = useRef<HTMLUListElement | null>(null);
  const minuteRef = useRef<HTMLUListElement | null>(null);

  const handleScroll = (
    ref: React.RefObject<HTMLUListElement>,
    setValue: React.Dispatch<React.SetStateAction<string>>,
    items: any[],
    isDate = false
  ) => {
    if (ref.current) {
      const index = Math.max(
        0,
        Math.min(items.length - 1, Math.round(ref.current.scrollTop / 32))
      );
      const selectedItem = items[index];
      setValue(isDate ? dateItems[index].label : selectedItem);
    }
  };

  useEffect(() => {
    if (dateRef.current) {
      dateRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
    if (hourRef.current) {
      hourRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
    if (minuteRef.current) {
      minuteRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  return (
    <TotalContainer>
      <Label>
        약속 시간
        <SelectedTime>{`${selectedDate} ${selectedHour}시 ${selectedMinute}분`}</SelectedTime>
      </Label>
      <PickerWrapper>
        <div style={{ flex: 2 }}>
          <Items
            ref={dateRef}
            onScroll={() =>
              handleScroll(
                dateRef,
                setSelectedDate,
                dateItems.map((item) => item.label),
                true
              )
            }
          >
            {dateItems.map((item) => (
              <Item key={item.value} isSelected={selectedDate === item.label}>
                <div>{item.label}</div>
              </Item>
            ))}
          </Items>
        </div>
        <div style={{ flex: 1 }}>
          <Items
            ref={hourRef}
            onScroll={() => handleScroll(hourRef, setSelectedHour, hours)}
          >
            {hours.map((hour) => (
              <Item key={hour} isSelected={selectedHour === hour}>
                <div>{hour}</div>
              </Item>
            ))}
          </Items>
        </div>
        <div style={{ flex: 1 }}>
          <Items
            ref={minuteRef}
            onScroll={() => handleScroll(minuteRef, setSelectedMinute, minutes)}
          >
            {minutes.map((minute) => (
              <Item key={minute} isSelected={selectedMinute === minute}>
                <div>{minute}</div>
              </Item>
            ))}
          </Items>
        </div>
      </PickerWrapper>
    </TotalContainer>
  );
};

export default WheelPicker;
