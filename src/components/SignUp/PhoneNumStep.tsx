import { Description, MainTitle } from '../../styles/SignUp/SignUp.styled';
import Button from '../common/Button/Button';

const PhoneNumStep: React.FC<{ onNext: () => void }> = ({ onNext }) => {
  return (
    <div>
      <MainTitle>전화번호를 입력해주세요.</MainTitle>
      <Description>
        입력된 정보는 외부에 공개되지 않으니 안심하세요.
      </Description>
      <Button onClick={onNext} variant="primary" size="lg" rounded="sm">
        다음
      </Button>
    </div>
  );
};

export default PhoneNumStep;
