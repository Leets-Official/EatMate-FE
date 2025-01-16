interface InputProps {
  as?: 'input' | 'textarea';
  placeholder?: string;
  maxLength?: number;
  rows?: number;
  type?: string;
}

export const Input: React.FC<InputProps> = ({
  as = 'input',
  placeholder,
  maxLength,
  rows,
  type = 'text',
}) => {
  return (
    <StyledInput
      as={as}
      placeholder={placeholder}
      maxLength={maxLength}
      rows={as === 'textarea' ? rows : undefined}
      type={as === 'input' ? type : undefined}
    />
  );
};
