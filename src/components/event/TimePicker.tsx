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

  const pickerData = [
    {
      key: 'date',
      items: dateItems.map((item) => item.label),
      selectedValue: selectedDate,
      setSelectedValue: setSelectedDate,
      ref: dateRef,
      show: showDatePicker,
    },
    {
      key: 'hour',
      items: hours,
      selectedValue: selectedHour,
      setSelectedValue: setSelectedHour,
      ref: hourRef,
      show: showDatePicker,
    },
    {
      key: 'minute',
      items: minutes,
      selectedValue: selectedMinute,
      setSelectedValue: setSelectedMinute,
      ref: minuteRef,
      show: true, // 분 선택은 항상 보이도록 설정
    },
  ];

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
        {pickerData.map(
          ({ key, items, selectedValue, setSelectedValue, ref, show }, index) =>
            show && (
              <S.ItemsContainer key={key} flex={key === 'date' ? 2 : 1}>
                <S.Items
                  ref={ref}
                  onScroll={() =>
                    handleScroll(ref, setSelectedValue, items, key === 'date')
                  }
                >
                  {items.map((item) => (
                    <S.Item key={item} isSelected={selectedValue === item}>
                      <div>{item}</div>
                    </S.Item>
                  ))}
                </S.Items>
              </S.ItemsContainer>
            )
        )}
        {additionalText && (
          <S.AdditionalText>{additionalText}</S.AdditionalText>
        )}
      </S.PickerWrapper>
    </S.TotalContainer>
  );
};

export default TimePicker;
