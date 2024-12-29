import { Description, MainTitle } from '../../styles/SignUp/SignUp.styled';
import Button from '../common/Button/Button';

const ProfileImgStep: React.FC<{ onNext: () => void }> = ({ onNext }) => {
  return (
    <div>
      <MainTitle>이제 마지막이에요!</MainTitle>
      <Description>EatMate에서 사용할 프로필 사진을 추가헤주세요.</Description>
      <Button onClick={onNext} variant="primary" size="lg" rounded="sm">
        다음
      </Button>
    </div>
  );
};

export default ProfileImgStep;
