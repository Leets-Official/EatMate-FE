import React, { useEffect, useRef, useState } from 'react';
import * as S from '@/styles/event/TimePicker.styled';
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

  const adjustedTime =
    now.minute() % 10 === 0 ? now : now.add(10 - (now.minute() % 10), 'minute');

  return {
    hours,
    minutes,
    defaultHour: adjustedTime.format('HH'),
    defaultMinute: adjustedTime.format('mm').padStart(2, '0'),
  };
};

const WheelPicker = ({ onChange }: { onChange: (date: string) => void }) => {
  const dateItems = generateDateItems();
  const { hours, minutes, defaultHour, defaultMinute } = generateTimeItems();

  const [selectedDate, setSelectedDate] = useState(dateItems[0].label);
  const [selectedHour, setSelectedHour] = useState(defaultHour);
  const [selectedMinute, setSelectedMinute] = useState(defaultMinute);

  const dateRef = useRef<HTMLUListElement | null>(null);
  const hourRef = useRef<HTMLUListElement | null>(null);
  const minuteRef = useRef<HTMLUListElement | null>(null);
  const isInitialMount = useRef(true);

  // 선택된 값을 상위 컴포넌트로 전달 (첫 렌더링 방지)
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    const currentDate = new Date();
    let formattedDate;

    if (selectedDate === '오늘') {
      formattedDate = currentDate;
    } else if (selectedDate === '내일') {
      formattedDate = new Date(currentDate.setDate(currentDate.getDate() + 1));
    } else {
      formattedDate = new Date(currentDate.setDate(parseInt(selectedDate, 10)));
    }

    formattedDate.setHours(parseInt(selectedHour, 10));
    formattedDate.setMinutes(parseInt(selectedMinute, 10));
    formattedDate.setSeconds(0);
    formattedDate.setMilliseconds(0);

    // KST로 변환 (UTC+9 시간 추가)
    const formattedDateByKST = dayjs(formattedDate).format(
      'YYYY-MM-DDTHH:mm:ss'
    );
    console.log('KST 변환된 시간:', formattedDateByKST);

    onChange(formattedDateByKST);
  }, [selectedDate, selectedHour, selectedMinute]);

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
    if (dateRef.current) {
      dateRef.current.scrollTo({
        top: 40 * 0,
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
  }, []);

  return (
    <S.TotalContainer>
      <S.Label>
        약속 시간
        <S.SelectedTime>{`${selectedDate} ${selectedHour}시 ${selectedMinute}분`}</S.SelectedTime>
      </S.Label>
      <S.PickerWrapper>
        <div style={{ flex: 2 }}>
          <S.Items
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
              <S.Item key={item.value} isSelected={selectedDate === item.label}>
                <div>{item.label}</div>
              </S.Item>
            ))}
          </S.Items>
        </div>
        <S.ItemsContainer flex={1}>
          <S.Items
            ref={hourRef}
            onScroll={() => handleScroll(hourRef, setSelectedHour, hours)}
          >
            {hours.map((hour) => (
              <S.Item key={hour} isSelected={selectedHour === hour}>
                <div>{hour}</div>
              </S.Item>
            ))}
          </S.Items>
        </S.ItemsContainer>
        <S.ItemsContainer flex={1}>
          <S.Items
            ref={minuteRef}
            onScroll={() => handleScroll(minuteRef, setSelectedMinute, minutes)}
          >
            {minutes.map((minute) => (
              <S.Item key={minute} isSelected={selectedMinute === minute}>
                <div>{minute}</div>
              </S.Item>
            ))}
          </S.Items>
        </S.ItemsContainer>
      </S.PickerWrapper>
    </S.TotalContainer>
  );
};

export default WheelPicker;
