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
  guideMessage?: string;
  inputRef?: React.RefObject<HTMLInputElement | HTMLTextAreaElement>;
  hasError?: boolean;
  errorMessage?: string;
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
  inputRef,
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
        ref={inputRef}
        hasError={hasError}
      />
      {hasError && errorMessage && <InputErrorMessage message={errorMessage} />}
      {guideMessage && <InputGuide message={guideMessage} />}
    </InputWrapper>
  );
};
