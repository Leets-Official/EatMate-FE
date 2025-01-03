import { InputField, ErrorMessage } from '@/styles/SignUp/SignUp.styled';

interface InputProps {
  type?: string;
  placeholder?: string;
  value?: string;
  maxLength?: number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  error?: boolean;
  errorMessage?: string;
  width?: string;
}

const SignUpInput: React.FC<InputProps> = ({
  type = 'text',
  placeholder = '',
  value,
  maxLength,
  onChange,
  onBlur,
  error = false,
  errorMessage,
  width,
}) => {
  return (
    <div>
      <InputField
        type={type}
        placeholder={placeholder}
        value={value}
        maxLength={maxLength}
        onChange={onChange}
        onBlur={onBlur}
        error={error}
        width={width}
      />
      {error && errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </div>
  );
};

export default SignUpInput;
