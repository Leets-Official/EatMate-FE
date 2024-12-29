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
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        maxLength={maxLength}
        error={error}
      />
      {error && <ErroMessage>{errorMessage}</ErroMessage>}
    </div>
  );
};

export default SignUpInput;
