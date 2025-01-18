import { useEffect, useState } from 'react';
import styled from 'styled-components';

const Wheel = styled.div`
  width: 80px;
  height: 120px;
  overflow-y: scroll;
  scroll-snap-type: y mandatory;

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
}

const TimePicker = <T extends string | number>({
  options,
  defaultValue,
  onChange,
}: TimePickerProps<T>) => {
  const [selectedValue, setSelectedValue] = useState<T>(defaultValue);

  useEffect(() => {
    onChange(selectedValue);
  }, [selectedValue, onChange]);

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
    <Wheel onScroll={handleScroll}>
      {options.map((option, idx) => (
        <TimeOption key={idx} isSelected={option === selectedValue}>
          {option}
        </TimeOption>
      ))}
    </Wheel>
  );
};

export default TimePicker;
