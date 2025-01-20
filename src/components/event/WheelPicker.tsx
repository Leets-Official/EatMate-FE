import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import dayjs from 'dayjs';

// 날짜 데이터 생성: 오늘, 내일, 나머지는 날짜 숫자만 표시
const generateDateItems = () => {
  return Array.from({ length: 7 }, (_, index) => {
    const date = dayjs().add(index, 'day');

    let label;
    if (index === 0) label = '오늘';
    else if (index === 1) label = '내일';
    else label = date.format('DD');

    return {
      value: date.format('YYYY-MM-DD'),
      label: label,
    };
  });
};

// 시간 및 분 데이터 생성
const hourItems = Array.from({ length: 24 }, (_, index) => ({
  value: index.toString().padStart(2, '0'),
  label: index.toString().padStart(2, '0'),
}));

const minuteItems = Array.from({ length: 6 }, (_, index) => ({
  value: `${index * 10}`.padStart(2, '0'),
  label: `${index * 10}`,
}));

// 스타일 정의
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px; /* 날짜, 시간, 분 간 간격 */
  width: 100%;
  max-width: 400px; /* 원하는 최대 너비 */
  margin: 0 auto;
  font-size: ${({ theme }) => theme.FONT_SIZE.sm};
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.regular};
`;

const PickerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100px;
  overflow: hidden;
`;

const Items = styled.ul`
  height: 96px; /* 3개 아이템만 보이도록 설정 */
  padding: 50% 0;
  margin: 0;
  overflow-y: scroll;
  scroll-snap-type: y mandatory;
  -ms-overflow-style: none;
  scrollbar-width: none;
  text-align: center;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const Item = styled.li`
  list-style-type: none;
  height: 32px;
  line-height: 32px;
  scroll-snap-align: center;
  color: #222;

  div {
    display: inline-block;
    width: 100%;
  }

  &:nth-child(n + 2) {
    color: #aaa; /* 흐린 효과 */
  }

  &:nth-child(3) {
    color: ${({ theme }) => theme.COLORS.main}; /* 선택된 항목 강조 */
  }
`;

const WheelPicker = () => {
  const dateItems = generateDateItems();
  const [selectedDate, setSelectedDate] = useState(dateItems[0].value);
  const [selectedHour, setSelectedHour] = useState(hourItems[0].value);
  const [selectedMinute, setSelectedMinute] = useState(minuteItems[0].value);

  const dateRef = useRef<HTMLLIElement | null>(null);
  const hourRef = useRef<HTMLLIElement | null>(null);
  const minuteRef = useRef<HTMLLIElement | null>(null);

  useEffect(() => {
    dateRef.current?.scrollIntoView({ block: 'center', behavior: 'smooth' });
    hourRef.current?.scrollIntoView({ block: 'center', behavior: 'smooth' });
    minuteRef.current?.scrollIntoView({ block: 'center', behavior: 'smooth' });
  }, [selectedDate, selectedHour, selectedMinute]);

  return (
    <div style={{ textAlign: 'center' }}>
      <h3 style={{ fontWeight: 'bold' }}>
        약속 시간{' '}
        <span
          style={{ color: '#ff6600' }}
        >{`${selectedDate} ${selectedHour}:${selectedMinute}`}</span>
      </h3>
      <Container>
        <PickerWrapper>
          <Items>
            {dateItems.map((item, index) => (
              <Item
                key={item.value}
                ref={index === 0 ? dateRef : null}
                onClick={() => setSelectedDate(item.value)}
              >
                <div>{item.label}</div>
              </Item>
            ))}
          </Items>
        </PickerWrapper>
        <PickerWrapper>
          <Items>
            {hourItems.map((item, index) => (
              <Item
                key={item.value}
                ref={index === 0 ? hourRef : null}
                onClick={() => setSelectedHour(item.value)}
              >
                <div>{item.label}</div>
              </Item>
            ))}
          </Items>
        </PickerWrapper>
        <PickerWrapper>
          <Items>
            {minuteItems.map((item, index) => (
              <Item
                key={item.value}
                ref={index === 0 ? minuteRef : null}
                onClick={() => setSelectedMinute(item.value)}
              >
                <div>{item.label}</div>
              </Item>
            ))}
          </Items>
        </PickerWrapper>
      </Container>
    </div>
  );
};

export default WheelPicker;
