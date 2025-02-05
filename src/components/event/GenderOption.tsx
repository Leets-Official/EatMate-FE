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

  &:disabled {
    cursor: not-allowed;
  }
`;

const RadioOption = styled.label`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
  cursor: pointer;
`;

const RadioLabel = styled.div`
  font-size: ${({ theme }) => theme.FONT_SIZE.sm};
`;

interface GenderOptionProps {
  userGender: 'MALE' | 'FEMALE';
  onChange: (value: 'ALL' | 'MALE' | 'FEMALE') => void;
  showError?: boolean;
  disabled?: boolean;
}

const GenderOption: React.FC<GenderOptionProps> = ({
  userGender,
  onChange,
  showError = false,
  disabled = false,
}) => {
  const [selectedOption, setSelectedOption] = useState<'ALL' | 'SAME' | null>(
    null
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled) return;
    const newValue = e.target.value as 'ALL' | 'SAME';
    setSelectedOption(newValue);
    onChange(newValue === 'SAME' ? userGender : 'ALL');
    console.log('선택된 성별 : ', newValue);
  };

  const options = [
    { id: 'gender-all', value: 'ALL', label: '모두 참여 가능해요' },
    { id: 'gender-same', value: 'SAME', label: '같은 성별만 참여 가능해요' },
  ];

  return (
    <GenderContainer>
      <Label hasError={showError}>성별 제한</Label>
      <div style={disabled ? { pointerEvents: 'none', opacity: 0.5 } : {}}>
        {options.map(({ id, value, label }) => (
          <RadioOption key={id} htmlFor={id}>
            <RadioInput
              id={id}
              type="radio"
              name="gender"
              value={value}
              checked={selectedOption === value}
              onChange={handleChange}
              hasError={showError}
              disabled={disabled}
            />
            <RadioLabel>{label}</RadioLabel>
          </RadioOption>
        ))}
      </div>
      {showError && <InputErrorMessage message="성별 제한을 선택해주세요." />}
    </GenderContainer>
  );
};

export default GenderOption;
