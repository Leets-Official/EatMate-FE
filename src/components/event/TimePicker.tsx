import { useEffect, useState } from 'react';
import styled from 'styled-components';

const Wheel = styled.div<{ isWide?: boolean }>`
  width: ${({ isWide }) => (isWide ? '120px' : '80px')};
  height: 120px;
  overflow-y: scroll;
  scroll-snap-type: y mandatory;
  padding-top: 40px;
  padding-bottom: 40px;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const TimeOption = styled.div<{ isSelected: boolean }>`
  height: 40px;
  line-height: 40px;
  text-align: center;
  scroll-snap-align: center;
  border-top: ${({ isSelected, theme }) =>
    isSelected ? `1px solid ${theme.COLORS.gray[50]}` : 'none'};
  border-bottom: ${({ isSelected, theme }) =>
    isSelected ? `1px solid ${theme.COLORS.gray[50]}` : 'none'};
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.light};
  color: ${({ theme, isSelected }) =>
    isSelected ? theme.COLORS.main : theme.COLORS.black};
`;

interface TimePickerProps<T> {
  options: T[];
  defaultValue: T;
  onChange: (value: T) => void;
  isWide?: boolean;
}

const TimePicker = <T extends string | number>({
  options,
  defaultValue,
  onChange,
  isWide = false,
}: TimePickerProps<T>) => {
  const [selectedValue, setSelectedValue] = useState<T>(defaultValue);

  useEffect(() => {
    onChange(selectedValue);
  }, [selectedValue, onChange]);

  useEffect(() => {
    const index = options.findIndex((option) => option === defaultValue);
    const itemHeight = 40;
    const wheelElement = document.getElementById('time-picker-wheel');
    if (wheelElement) {
      wheelElement.scrollTop = index * itemHeight;
    }
  }, [defaultValue, options]);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const element = e.currentTarget;
    const itemHeight = 40;
    const scrollTop = element.scrollTop;
    const index = Math.round(scrollTop / itemHeight);

    setSelectedValue(options[index]);
    element.scrollTo({
      top: index * itemHeight,
      behavior: 'smooth',
    });
  };

  return (
    <Wheel id="time-picker-wheel" isWide={isWide} onScroll={handleScroll}>
      {options.map((option, idx) => (
        <TimeOption key={idx} isSelected={option === selectedValue}>
          {option}
        </TimeOption>
      ))}
    </Wheel>
  );
};

export default TimePicker;
