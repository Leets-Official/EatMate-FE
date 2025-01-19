import styled from 'styled-components';
import { useState } from 'react';
import ReactSlider from 'react-slider';

const SliderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border-radius: 8px;
`;

const RangeLabel = styled.div<{ isColor: boolean; isEnabled: boolean }>`
  font-size: 18px;
  font-weight: 700;
  color: ${({ isColor, isEnabled, theme }) =>
    isEnabled
      ? isColor
        ? theme.COLORS.main
        : 'black'
      : theme.COLORS.gray[300]};
  margin-bottom: 25px;
  text-align: left;
  width: 100%;
  max-width: 300px;
`;

const StyledSlider = styled(ReactSlider)<{ disabled: boolean }>`
  width: 100%;
  max-width: 300px;
  height: 4px;
  border-radius: 4px;
  background: ${({ disabled, theme }) =>
    disabled ? theme.COLORS.gray[300] : theme.COLORS.gray[200]};
  position: relative;
  pointer-events: ${({ disabled }) => (disabled ? 'none' : 'auto')};
`;

const StyledTrack = styled.div<{ disabled: boolean }>`
  background: ${({ disabled, theme }) =>
    disabled ? theme.COLORS.gray[300] : theme.COLORS.main};
  height: 100%;
  border-radius: 8px;
  position: absolute;
`;

const StyledThumb = styled.div<{ disabled: boolean }>`
  height: 20px;
  width: 20px;
  border-radius: 50%;
  background: ${({ theme }) => theme.COLORS.white};
  border: 2px solid
    ${({ disabled, theme }) =>
      disabled ? theme.COLORS.gray[300] : theme.COLORS.gray[300]};
  position: relative;
  top: 50%;
  transform: translateY(-50%);
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};

  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    height: 12px;
    width: 12px;
    background: ${({ disabled, theme }) =>
      disabled ? theme.COLORS.gray[300] : theme.COLORS.main};
    border-radius: 50%;
  }

  &:focus {
    outline: none;
  }

  &:active {
    border: ${({ disabled, theme }) =>
      disabled ? 'none' : `2px solid ${theme.COLORS.main}`};
  }
`;

const CheckboxWrapper = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  font-weight: bold;
  cursor: pointer;
  margin-top: 16px;
  margin-left: -3px;
  width: 100%;
  max-width: 300px;
  justify-content: flex-start;
`;

const Checkbox = styled.input`
  appearance: none;
  width: 18px;
  height: 18px;
  border: 2px solid ${({ theme }) => theme.COLORS.gray[300]};
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &:checked {
    background-color: ${({ theme }) => theme.COLORS.main};
    border-color: ${({ theme }) => theme.COLORS.main};
  }

  &:checked::after {
    content: '';
    display: block;
    width: 10px;
    height: 5px;
    border: solid white;
    border-width: 0 0 3px 3px;
    transform: rotate(-45deg);
  }
`;

interface RangeSliderProps {
  isColor?: boolean;
}

const RangeSlider = ({ isColor = true }: RangeSliderProps) => {
  const [range, setRange] = useState<[number, number]>([2, 10]);
  const [isEnabled, setIsEnabled] = useState(true);

  const handleChange = (value: number | readonly number[]) => {
    if (Array.isArray(value)) {
      setRange([value[0], value[1]] as [number, number]);
    }
  };

  const handleCheckboxChange = () => {
    setIsEnabled((prev) => !prev);
  };

  return (
    <SliderContainer>
      <RangeLabel isColor={isColor} isEnabled={isEnabled}>
        {range[0] === range[1]
          ? `${range[0]}인`
          : `${range[0]}인~${range[1]}인`}
      </RangeLabel>
      <StyledSlider
        value={range}
        onChange={handleChange}
        min={2}
        max={10}
        step={1}
        renderTrack={(props, state) => {
          const [min, max] = state.value as number[];
          return (
            <StyledTrack
              {...props}
              disabled={!isEnabled}
              style={{
                ...props.style,
                left: `${((min - 2) / (10 - 2)) * 100}%`,
                width: `${((max - min) / (10 - 2)) * 100}%`,
              }}
            />
          );
        }}
        renderThumb={(props) => (
          <StyledThumb {...props} disabled={!isEnabled} />
        )}
        disabled={!isEnabled}
      />
      <CheckboxWrapper>
        <Checkbox
          type="checkbox"
          onChange={handleCheckboxChange}
          checked={!isEnabled}
        />
        참여인원 상관 없어요
      </CheckboxWrapper>
    </SliderContainer>
  );
};

export default RangeSlider;
