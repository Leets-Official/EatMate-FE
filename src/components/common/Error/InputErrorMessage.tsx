import errorCheck from '@/assets/images/error_check.svg';
import styled from 'styled-components';

interface ErrorMessageProps {
  message: string;
}

export const ErrorContainer = styled.span`
  font-size: ${({ theme }) => theme.FONT_SIZE.sm};
  color: ${({ theme }) => theme.COLORS.error};
  margin-top: 10px;
  padding-left: 2.5rem;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const InputErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <ErrorContainer>
      <img src={errorCheck} alt="check-icon" />
      <span>{message}</span>
    </ErrorContainer>
  );
};

export default InputErrorMessage;
