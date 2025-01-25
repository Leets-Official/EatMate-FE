import React from 'react';
import { useTimePicker } from '@/hooks/useTimePicker';
import * as S from '@/styles/event/TimePicker.styled';

interface TimePickerProps {
  label: string;
  onChange: (date: string) => void;
  showDatePicker?: boolean;
  additionalText?: string;
}

const TimePicker: React.FC<TimePickerProps> = ({
  label,
  onChange,
  showDatePicker = true,
  additionalText,
}) => {
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
    items: string[],
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

  return (
    <S.TotalContainer>
      <S.Label>
        {label}
        {showDatePicker && (
          <S.SelectedTime>{`${selectedDate} ${selectedHour}시 ${selectedMinute}분`}</S.SelectedTime>
        )}
      </S.Label>
      <S.PickerWrapper>
        {showDatePicker && (
          <S.ItemsContainer flex={2}>
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
                <S.Item
                  key={item.value}
                  isSelected={selectedDate === item.label}
                >
                  <div>{item.label}</div>
                </S.Item>
              ))}
            </S.Items>
          </S.ItemsContainer>
        )}
        {showDatePicker && (
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
        )}
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
        {additionalText && (
          <S.AdditionalText>{additionalText}</S.AdditionalText>
        )}
      </S.PickerWrapper>
    </S.TotalContainer>
  );
};

export default TimePicker;
