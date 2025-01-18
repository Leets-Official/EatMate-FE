import { useEffect, useState } from 'react';
import styled from 'styled-components';

const PickerContainer = styled.div`
  display: flex;
  gap: 16px;
  justify-content: center;
  align-items: center;
`;

const Wheel = styled.div`
  width: 80px;
  height: 100px;
  overflow-y: scroll;
  scroll-snap-type: y mandatory;

  &::-webkit-scrollbar {
    display: none;
  }
`;
const TimeOption = styled.div<{ isSelected: boolean }>`
  height: 40px;
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.light};
  text-align: center;
  line-height: 40px;
  color: ${({ theme, isSelected }) =>
    isSelected ? theme.COLORS.main : theme.COLORS.gray[500]};
  scroll-snap-align: center;
`;
interface TimePickerProps {
  options: (string | number)[];
  defaultValue: string | number;
  onChange: (value: string | number) => void;
}

const TimePicker: React.FC<TimePickerProps> = ({
  options,
  defaultValue,
  onChange,
}) => {
  const [selectedValue, setSelectedValue] = useState<string | number>(
    defaultValue
  );

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
