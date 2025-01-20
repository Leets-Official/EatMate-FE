import styled from 'styled-components';
import { useState } from 'react';
import ReactSlider from 'react-slider';
import checkIcon from '@/assets/images/ic_checked_box.svg';
import unCheckIcon from '@/assets/images/ic_unChecked_box.svg';
import { flexAlignCenter, flexColumn } from '@/styles/CommonStyle';
const SliderContainer = styled.div`
  ${flexColumn}
  align-items: left;
  border-radius: 8px;
  margin-top: 10px;
`;

const RangeLabel = styled.div<{ isColor: boolean; isEnabled: boolean }>`
  font-size: 18px;
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.light};
  color: ${({ isColor, isEnabled, theme }) =>
    isEnabled
      ? isColor
        ? theme.COLORS.main
        : 'black'
      : theme.COLORS.gray[300]};
  margin-bottom: 15px;
  text-align: left;
  width: 100%;
  max-width: 300px;
`;

const StyledSlider = styled(ReactSlider)<{ disabled: boolean }>`
  margin-bottom: 16px;
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
  height: 16px;
  width: 16px;
  border-radius: 50%;
  background: ${({ theme }) => theme.COLORS.white};
  border: 1px solid
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
    height: 8px;
    width: 8px;
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
  ${flexAlignCenter}
  gap: 8px;
  font-size: ${({ theme }) => theme.FONT_SIZE.sm};
  cursor: pointer;
  width: 100%;
  max-width: 300px;
  justify-content: flex-start;
`;

const CheckboxIcon = styled.img`
  width: 18px;
  height: 18px;
  cursor: pointer;
`;

interface RangeSliderProps {
  onLabelChange?: (label: string) => void;
  isColor?: boolean;
  isCheck?: boolean;
}

const RangeSlider = ({
  onLabelChange,
  isColor = true,
  isCheck = true,
}: RangeSliderProps) => {
  const [range, setRange] = useState<[number, number]>([2, 10]);
  const [isEnabled, setIsEnabled] = useState(true);

  const handleChange = (value: number | readonly number[]) => {
    if (Array.isArray(value)) {
      setRange([value[0], value[1]] as [number, number]);

      // onLabelChange가 존재하는 경우에만 호출
      if (onLabelChange) {
        onLabelChange(`${value[0]}인~${value[1]}인`);
      }
    }
  };

  const handleCheckboxChange = () => {
    const newValue = !isEnabled;
    setIsEnabled(newValue);

    if (!newValue) {
      onLabelChange?.('상관없음');
    } else {
      onLabelChange?.(`${range[0]}인~${range[1]}인`);
    }
  };

  return (
    <SliderContainer>
      <RangeLabel isColor={isColor} isEnabled={isEnabled}>
        {isEnabled ? `${range[0]}인~${range[1]}인` : '상관없음'}
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
      {isCheck && (
        <CheckboxWrapper onClick={handleCheckboxChange}>
          <CheckboxIcon
            src={isEnabled ? unCheckIcon : checkIcon}
            alt="checkbox"
          />
          참여인원 상관 없어요
        </CheckboxWrapper>
      )}
    </SliderContainer>
  );
};

export default RangeSlider;
