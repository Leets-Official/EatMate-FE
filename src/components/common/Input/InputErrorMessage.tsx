import { ErrorContainer } from './styles';

interface ErrorMessageProps {
  message: string;
}

const InputErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <ErrorContainer>
      <span>{message}</span>
    </ErrorContainer>
  );
};

export default InputErrorMessage;
