import {
  ButtonContainer,
  Description,
  InputContainer,
  MainTitle,
} from '@/styles/SignUp/SignUp.styled';
import Button from '@/common/Button/Button';
import SignUpInput from './SignupInput';

const StudentIdStep: React.FC<{ onNext: () => void }> = ({ onNext }) => {
  return (
    <div>
      <MainTitle>학교 인증을 위해</MainTitle>
      <MainTitle>학번을 입력해 주세요!</MainTitle>
      <Description>
        입력한 학번은 인증 용도로만 사용되며, 안전하게 보호됩니다.
      </Description>

      <InputContainer isSingleInput={true}>
        <SignUpInput />
      </InputContainer>

      <ButtonContainer>
        <Button onClick={onNext} variant="primary" size="lg" rounded="sm">
          다음
        </Button>
      </ButtonContainer>
    </div>
  );
};

export default StudentIdStep;
