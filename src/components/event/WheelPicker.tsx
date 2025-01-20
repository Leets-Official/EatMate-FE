import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import dayjs from 'dayjs';

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

// 시간 및 분 데이터 생성
const generateTimeItems = () => {
  const now = dayjs().add(30, 'minute'); // 현재 시간 기준 30분 후 설정
  const hours = Array.from({ length: 24 }, (_, i) =>
    i.toString().padStart(2, '0')
  );

  // 10분 단위로 정확한 분 생성
  const minutes = Array.from({ length: 6 }, (_, i) =>
    (i * 10).toString().padStart(2, '0')
  );

  const roundedMinutes = Math.ceil(now.minute() / 10) * 10;
  const adjustedTime =
    now.minute() % 10 === 0 ? now : now.add(10 - (now.minute() % 10), 'minute');

  return {
    hours,
    minutes,
    defaultHour: adjustedTime.format('HH'),
    defaultMinute: adjustedTime.format('mm').padStart(2, '0'),
  };
};

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
  padding-bottom: 30px;
`;

const Items = styled.ul`
  height: 100px;
  padding: 30px 0;
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
  line-height: 40px;
  scroll-snap-align: center;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ isSelected, theme }) =>
    isSelected ? theme.COLORS.main : '#000'};
  font-weight: ${({ isSelected, theme }) =>
    isSelected ? theme.FONT_WEIGHT.bold : theme.FONT_WEIGHT.regular};
  border-top: ${({ isSelected, theme }) =>
    isSelected ? `1px solid ${theme.COLORS.gray[50]}` : 'none'};
  border-bottom: ${({ isSelected, theme }) =>
    isSelected ? `1px solid ${theme.COLORS.gray[50]}` : 'none'};
  transition: all 0.3s ease;
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
      const offset = ref.current.scrollTop + ref.current.clientHeight / 2;
      const index = Math.max(
        0,
        Math.min(items.length - 1, Math.round(offset / 40) - 1)
      );
      const selectedItem = items[index];
      setValue(isDate ? dateItems[index].label : selectedItem);
    }
  };

  useEffect(() => {
    // 중앙 정렬을 위해 초기 스크롤 위치 조정
    if (dateRef.current) {
      dateRef.current.scrollTo({
        top: 40 * 1, // '오늘'이 중앙에 위치하도록 조정
        behavior: 'smooth',
      });
    }
    if (hourRef.current) {
      const hourIndex = hours.findIndex((h) => h === defaultHour);
      hourRef.current.scrollTo({
        top: 40 * hourIndex,
        behavior: 'smooth',
      });
    }
    if (minuteRef.current) {
      const minuteIndex = minutes.findIndex((m) => m === defaultMinute);
      minuteRef.current.scrollTo({
        top: 40 * minuteIndex,
        behavior: 'smooth',
      });
    }
  }, [defaultHour, defaultMinute]);

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
