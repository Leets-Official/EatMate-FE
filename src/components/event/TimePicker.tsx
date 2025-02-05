import React, { useEffect } from 'react';
import { useTimePicker } from '@/hooks/useTimePicker';
import * as S from '@/styles/event/TimePicker.styled';

interface TimePickerProps {
  label: string;
  onChange: (date: string) => void;
  showDatePicker?: boolean;
  additionalText?: string;
  initialValue?: string;
}

const TimePicker: React.FC<TimePickerProps> = ({
  label,
  onChange,
  showDatePicker = true,
  additionalText,
  initialValue,
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
  } = useTimePicker(onChange, showDatePicker);

  // 초기값이 있을 경우 해당 값으로 세팅
  useEffect(() => {
    if (initialValue && !selectedDate) {
      // ✅ 최초 렌더링 시에만 실행
      const date = new Date(initialValue);
      const today = new Date();

      // ✅ 날짜 차이를 계산하여 "오늘", "내일", "3일 후" 등의 형식 유지
      const daysDiff = Math.floor(
        (date.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
      );

      let formattedDate = '오늘';
      if (daysDiff === 1) {
        formattedDate = '내일';
      } else if (daysDiff > 1) {
        formattedDate = `${daysDiff}일 후`;
      }

      const formattedHour = String(date.getHours()).padStart(2, '0');
      const formattedMinute = String(date.getMinutes()).padStart(2, '0');

      setSelectedDate(formattedDate);
      setSelectedHour(formattedHour);
      setSelectedMinute(formattedMinute);
    }
  }, [initialValue]); // initialValue가 변경될 때만 실행

  interface PickerItem {
    key: string;
    items: string[];
    selectedValue: string | undefined;
    setSelectedValue: React.Dispatch<React.SetStateAction<string | undefined>>;
    ref: React.RefObject<HTMLUListElement>;
  }

  const pickerData: PickerItem[] = [
    showDatePicker && {
      key: 'date',
      items: dateItems.map((item) => item.label),
      selectedValue: selectedDate,
      setSelectedValue: setSelectedDate,
      ref: dateRef,
    },
    showDatePicker && {
      key: 'hour',
      items: hours,
      selectedValue: selectedHour,
      setSelectedValue: setSelectedHour,
      ref: hourRef,
    },
    {
      key: 'minute',
      items: minutes,
      selectedValue: selectedMinute,
      setSelectedValue: setSelectedMinute,
      ref: minuteRef,
    },
  ].filter(Boolean) as PickerItem[];

  const handleScroll = (
    ref: React.RefObject<HTMLUListElement>,
    setValue: React.Dispatch<React.SetStateAction<string | undefined>>,
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
        {pickerData
          .filter((item) => item && typeof item === 'object')
          .map(({ key, items, selectedValue, setSelectedValue, ref }) => (
            <S.ItemsContainer
              key={key}
              flex={showDatePicker && key === 'date' ? 1 : 0.5}
            >
              <S.Items
                ref={ref}
                onScroll={() =>
                  handleScroll(ref, setSelectedValue, items, key === 'date')
                }
              >
                {items?.map((item: string) => (
                  <S.Item key={item} isSelected={selectedValue === item}>
                    <div>{item}</div>
                  </S.Item>
                ))}
              </S.Items>
            </S.ItemsContainer>
          ))}
        {additionalText && (
          <S.AdditionalText>{additionalText}</S.AdditionalText>
        )}
      </S.PickerWrapper>
    </S.TotalContainer>
  );
};

export default TimePicker;
