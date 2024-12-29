import { Description, MainTitle } from '../../styles/SignUp/SignUp.styled';
import Button from '../common/Button/Button';

const MbtiStep: React.FC<{ onNext: () => void }> = ({ onNext }) => {
  return (
    <div>
      <MainTitle>MBTI를 알고계시나요?</MainTitle>
      <Description>다른 사용자들이 당신을 더 잘 이해할 수 있어요.</Description>
      <Button onClick={onNext} variant="primary" size="lg" rounded="sm">
        다음
      </Button>
    </div>
  );
};

export default MbtiStep;
