import { Label } from '@/components/common/Input/styles';
import { flexColumn } from '@/styles/CommonStyle';
import { useState } from 'react';
import styled from 'styled-components';
import InputErrorMessage from '@/components/common/Input/InputErrorMessage';

const GenderContainer = styled.div`
  ${flexColumn}
  gap: 7px;
  padding: 30px 0;
`;

const RadioInput = styled.input<{ hasError?: boolean }>`
  appearance: none;
  position: relative;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  cursor: pointer;

  border: 1px solid
    ${({ theme, hasError }) =>
      hasError ? theme.COLORS.error : theme.COLORS.gray[50]};

  &:checked {
    border-color: ${({ theme }) => theme.COLORS.gray[50]};
    background-color: transparent;

    &::after {
      content: '';
      position: absolute;
      width: 8px;
      height: 8px;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background-color: ${({ theme }) => theme.COLORS.main};
      border-radius: 50%;
    }
  }
`;

const RadioOption = styled.label`
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
`;

const RadioLabel = styled.div`
  font-size: ${({ theme }) => theme.FONT_SIZE.sm};
`;

interface GenderOptionProps {
  onChange?: (value: string) => void;
  showError?: boolean;
}

const GenderOption: React.FC<GenderOptionProps> = ({
  onChange,
  showError = false,
}) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(e.target.value);
    if (onChange) {
      onChange(e.target.value);
    }
  };

  return (
    <GenderContainer>
      <Label hasError={showError}>성별 제한</Label>
      <RadioOption htmlFor="gender-all">
        <RadioInput
          id="gender-all"
          type="radio"
          name="gender"
          value="모두 참여 가능해요"
          checked={selectedOption === '모두 참여 가능해요'}
          onChange={handleChange}
          hasError={showError}
        />
        <RadioLabel>모두 참여 가능해요</RadioLabel>
      </RadioOption>
      <RadioOption htmlFor="gender-same">
        <RadioInput
          id="gender-same"
          type="radio"
          name="gender"
          value="같은 성별만 참여 가능해요"
          checked={selectedOption === '같은 성별만 참여 가능해요'}
          onChange={handleChange}
          hasError={showError}
        />
        <RadioLabel>같은 성별만 참여 가능해요</RadioLabel>
      </RadioOption>
      {showError && <InputErrorMessage message="성별 제한을 선택해주세요." />}
    </GenderContainer>
  );
};

export default GenderOption;
