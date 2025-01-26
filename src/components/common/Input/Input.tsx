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
}) => {
  return (
    <InputWrapper>
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
      />
      {hasError && errorMessage && <InputErrorMessage message={errorMessage} />}
      {guideMessage && <InputGuide message={guideMessage} />}
    </InputWrapper>
  );
};
