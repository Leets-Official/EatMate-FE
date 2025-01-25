import React from 'react';
import { useTimePicker } from '@/hooks/useTimePicker';
import * as S from '@/styles/event/TimePicker.styled';

interface TimePickerProps {
  label: string;
  onChange: (date: string) => void;
}

const TimePicker: React.FC<TimePickerProps> = ({ label, onChange }) => {
  const {
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
  } = useTimePicker(onChange);

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
