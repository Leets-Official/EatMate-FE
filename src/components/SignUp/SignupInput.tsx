import { InputField, ErrorMessage } from '../../styles/SignUp/SignUp.styled';

interface InputProps {
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  maxLength?: number;
  error?: boolean;
  errorMessage?: string;
}

const SignUpInput: React.FC<InputProps> = ({
  type = 'text',
  placeholder = '',
  value,
  onChange,
  maxLength,
  error = false,
  errorMessage,
}) => {
  return (
    <div>
      <InputField
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        maxLength={maxLength}
        error={error}
      />
      {error && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </div>
  );
};

export default SignUpInput;
