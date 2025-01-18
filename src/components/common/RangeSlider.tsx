import styled from 'styled-components';
import theme from '@/styles/theme';
import React, { useState } from 'react';
import ReactSlider from 'react-slider';

const SliderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  padding: 20px;
  border-radius: 8px;
`;

const RangeLabel = styled.div<{ isColor: boolean }>`
  font-size: 18px;
  font-weight: bold;
  color: ${({ isColor, theme }) => (isColor ? theme.COLORS.main : 'black')};
  margin-bottom: 20px;
  text-align: left;
  width: 100%;
  max-width: 300px;
`;

const StyledSlider = styled(ReactSlider)`
  width: 100%;
  max-width: 300px;
  height: 8px;
  border-radius: 4px;
  background: ${theme.COLORS.gray[200]};
  position: relative;
`;

const StyledTrack = styled.div`
  background: ${theme.COLORS.main};
  height: 100%;
  border-radius: 4px;
  position: absolute;
`;

const StyledThumb = styled.div`
  height: 20px;
  width: 20px;
  border-radius: 50%;
  background: #fff;
  border: 2px solid ${theme.COLORS.gray[300]};
  position: relative;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;

  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    height: 12px;
    width: 12px;
    background: ${theme.COLORS.main};
    border-radius: 50%;
  }

  &:focus {
    outline: none; /* 브라우저 기본 outline 제거 */
  }

  &:active {
    border: 2px solid ${theme.COLORS.main}; /* 검은색 테두리 제거 후 main 색상으로 대체 */
  }
`;

interface RangeSliderProps {
  isOpen: boolean;
  isColor?: boolean;
}

const RangeSlider = ({ isOpen, isColor = true }: RangeSliderProps) => {
  const [range, setRange] = useState<[number, number]>([2, 10]);

  const handleChange = (value: number | readonly number[]) => {
    if (Array.isArray(value)) {
      setRange([value[0], value[1]] as [number, number]);
    }
  };

  return (
    <SliderContainer>
      <RangeLabel isColor={isColor}>
        {range[0] === range[1]
          ? `${range[0]}인` // 핸들 값이 같을 때
          : `${range[0]}인 ~ ${range[1]}인`}{' '}
        {/* 핸들 값이 다를 때 */}
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
              style={{
                ...props.style,
                left: `${((min - 2) / (10 - 2)) * 100}%`,
                width: `${((max - min) / (10 - 2)) * 100}%`,
              }}
            />
          );
        }}
        renderThumb={(props) => <StyledThumb {...props} />}
      />
    </SliderContainer>
  );
};

export default RangeSlider;
