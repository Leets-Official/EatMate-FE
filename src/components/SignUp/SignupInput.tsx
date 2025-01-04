import { InputField, ErrorMessage } from '@/styles/SignUp/SignUp.styled';

interface InputProps {
  type?: string;
  placeholder?: string;
  value?: string;
  maxLength?: number;
  inputMode?:
    | 'none'
    | 'text'
    | 'tel'
    | 'url'
    | 'email'
    | 'numeric'
    | 'decimal'
    | undefined;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  error?: boolean;
  width?: string;
}

const SignUpInput: React.FC<InputProps> = ({
  type = 'text',
  placeholder = '',
  value,
  maxLength,
  inputMode,
  onChange,
  onBlur,
  error = false,
  width,
  ...props
}) => {
  return (
    <div>
      <InputField
        type={type}
        placeholder={placeholder}
        value={value}
        maxLength={maxLength}
        inputMode={inputMode}
        onChange={onChange}
        onBlur={onBlur}
        error={error}
        width={width}
        {...props}
      />
    </div>
  );
};

export default SignUpInput;
