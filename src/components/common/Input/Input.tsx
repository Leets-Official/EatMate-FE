import React from 'react';
import InputErrorMessage from './InputErrorMessage';
import InputGuide from './InputGuide';
import { InputWrapper, Label, StyledInput } from './styles';

interface InputProps {
  label?: string;
  as?: 'input' | 'textarea';
  placeholder?: string;
  maxLength?: number;
  rows?: number;
  type?: string;
  guideMessage?: string | string[] | React.ReactNode;
  hasError?: boolean;
  errorMessage?: string;
  value?: string;
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onClick?: () => void;
  readOnly?: boolean;
  isBankInput?: boolean;
  keepBackground?: boolean;
}

export const Input: React.FC<InputProps> = ({
  label,
  as = 'input',
  placeholder,
  maxLength,
  rows,
  type = 'text',
  guideMessage,
  hasError = false,
  errorMessage,
  value,
  onChange,
  onClick,
  readOnly = false,
  isBankInput = false,
  keepBackground,
}) => {
  return (
    <InputWrapper style={{ marginTop: isBankInput ? '-30px' : '0px' }}>
      <Label hasError={hasError}>{label}</Label>
      <StyledInput
        as={as}
        placeholder={placeholder}
        maxLength={maxLength}
        rows={as === 'textarea' ? rows : undefined}
        type={as === 'input' ? type : undefined}
        hasError={hasError}
        value={value}
        onChange={onChange}
        onClick={onClick}
        readOnly={readOnly}
        keepBackground={keepBackground}
      />
      {hasError && errorMessage && <InputErrorMessage message={errorMessage} />}
      {guideMessage && <InputGuide message={guideMessage} />}
    </InputWrapper>
  );
};
