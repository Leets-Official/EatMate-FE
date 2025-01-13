import styled from 'styled-components';
import theme from '@/styles/theme';
import React, { useEffect, useState } from 'react';

// 슬라이더 컨테이너 스타일 정의
const SliderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  padding: 20px;
  border-radius: 8px;
`;

// 상단 범위 레이블 스타일 정의
const RangeLabel = styled.div`
  font-size: 18px;
  font-weight: bold;
  color: ${({ theme }) => theme.COLORS.main};
  margin-bottom: 20px;
`;

// 슬라이더 스타일 정의
const Slider = styled.input`
  -webkit-appearance: none;
  appearance: none;
  width: 100%;
  max-width: 300px;
  height: 8px;
  border-radius: 4px;
  background: ${(props) => {
    const percentage =
      ((Number(props.value) - Number(props.min)) /
        (Number(props.max) - Number(props.min))) *
      100;
    return `linear-gradient(to right, ${theme.COLORS.main} 0%, ${theme.COLORS.main} ${percentage}%, ${theme.COLORS.gray[200]} ${percentage}%, ${theme.COLORS.gray[200]} 100%)`;
  }};
  cursor: pointer;

  &:focus {
    outline: none;
  }

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 20px;
    height: 20px;
    background: ${({ theme }) => theme.COLORS.white};
    border: 2px solid ${({ theme }) => theme.COLORS.main};
    border-radius: 50%;
    cursor: pointer;
  }

  &::-moz-range-thumb {
    width: 20px;
    height: 20px;
    background: ${({ theme }) => theme.COLORS.white};
    border: 2px solid ${({ theme }) => theme.COLORS.main};
    border-radius: 50%;
    cursor: pointer;
  }
`;

interface ThirdQuestionProps {
  isOpen: boolean;
}

const ThirdQuestion = ({ isOpen }: ThirdQuestionProps) => {
  // TODO: recoil 사용하도록 수정하기
  // 고정된 최소값 (2인)
  const [minValue] = useState(2);
  // 선택 가능한 최대값
  const [maxValue, setMaxValue] = useState(2);

  // 2인만 선택된 상태인지 여부를 추적
  const [isTwo, setIsTwo] = useState(true);

  useEffect(() => {
    if (isOpen) {
      setIsTwo(minValue === 2 && maxValue === 2);
    }
  }, [isOpen, minValue, maxValue]);

  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);
    setMaxValue(value);

    // 슬라이더 값 변경 시 isTwo 상태 업데이트
    setIsTwo(minValue === 2 && value === 2);
  };

  return (
    <SliderContainer>
      {/* 상단 범위 레이블 */}
      <RangeLabel>
        {isTwo ? `${minValue}인` : `${minValue}인 ~ ${maxValue}인`}
      </RangeLabel>
      {/* 슬라이더 */}
      <Slider
        type="range"
        min={2}
        max={10}
        step={1}
        value={maxValue}
        onChange={handleSliderChange}
      />
    </SliderContainer>
  );
};

export default ThirdQuestion;
