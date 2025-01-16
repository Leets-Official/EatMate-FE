import { InputWrapper, Label, StyledInput } from './styles';

interface InputProps {
  label?: string;
  as?: 'input' | 'textarea';
  placeholder?: string;
  maxLength?: number;
  rows?: number;
  type?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  as = 'input',
  placeholder,
  maxLength,
  rows,
  type = 'text',
}) => {
  return (
    <InputWrapper>
      <Label>{label}</Label>
      <StyledInput
        as={as}
        placeholder={placeholder}
        maxLength={maxLength}
        rows={as === 'textarea' ? rows : undefined}
        type={as === 'input' ? type : undefined}
      />
    </InputWrapper>
  );
};
