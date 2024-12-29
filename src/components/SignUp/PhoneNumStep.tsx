import {
  ButtonContainer,
  Description,
  InputContainer,
  MainTitle,
} from '../../styles/SignUp/SignUp.styled';
import Button from '../common/Button/Button';
import SignUpInput from './SignupInput';

const PhoneNumStep: React.FC<{ onNext: () => void }> = ({ onNext }) => {
  return (
    <div>
      <MainTitle>전화번호를 입력해주세요.</MainTitle>
      <Description>
        입력된 정보는 외부에 공개되지 않으니 안심하세요.
      </Description>

      <SignUpInput placeholder="010-0000-0000" />

      <ButtonContainer>
        <Button onClick={onNext} variant="primary" size="lg" rounded="sm">
          다음
        </Button>
      </ButtonContainer>
    </div>
  );
};

export default PhoneNumStep;
