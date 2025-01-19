// import errorCheck from '@/assets/images/error_check.svg';
import { ErrorContainer } from './styles';

interface ErrorMessageProps {
  message: string;
}

const InputErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <ErrorContainer>
      {/* <img src={errorCheck} alt="check-icon" /> */}
      <span>{message}</span>
    </ErrorContainer>
  );
};

export default InputErrorMessage;

{
  /*
  refactor ( props 옵션 추가 ) :
       체크 svg 선택 여부 
        // 체크 svg 색깔 
        // 텍스트 색깔  
        텍스트 크기
  */
}
