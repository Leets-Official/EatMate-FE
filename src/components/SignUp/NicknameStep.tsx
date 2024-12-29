import { Description, MainTitle } from '../../styles/SignUp/SignUp.styled';
import Button from '../common/Button/Button';
import SignUpInput from './SignupInput';

const NicknameStep: React.FC<{ onNext: () => void }> = ({ onNext }) => {
  return (
    <div>
      <MainTitle>당신을 더 알고 싶어요!</MainTitle>
      <Description>뭐라고 불러드리면 될까요?</Description>
      <SignUpInput />
      <Button onClick={onNext} variant="primary" size="lg" rounded="sm">
        다음
      </Button>
    </div>
  );
};

export default NicknameStep;
