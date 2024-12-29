import {
  ButtonContainer,
  Description,
  InputContainer,
  MainTitle,
} from '../../styles/SignUp/SignUp.styled';
import Button from '../common/Button/Button';
import SignUpInput from './SignupInput';

const MbtiStep: React.FC<{ onNext: () => void }> = ({ onNext }) => {
  return (
    <div>
      <MainTitle>MBTI를 알고계시나요?</MainTitle>
      <Description>다른 사용자들이 당신을 더 잘 이해할 수 있어요.</Description>

      <InputContainer isSingleInput={false}>
        <SignUpInput width="50px" />
        <SignUpInput width="50px" />
        <SignUpInput width="50px" />
        <SignUpInput width="50px" />
      </InputContainer>

      <ButtonContainer>
        <Button onClick={onNext} variant="primary" size="lg" rounded="sm">
          나중에 하기
        </Button>
      </ButtonContainer>
    </div>
  );
};

export default MbtiStep;
