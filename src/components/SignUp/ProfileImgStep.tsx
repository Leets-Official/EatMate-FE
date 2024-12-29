import {
  ButtonContainer,
  Description,
  MainTitle,
} from '@/styles/SignUp/SignUp.styled';
import Button from '@/components/common/Button/Button';

const ProfileImgStep: React.FC<{ onNext: () => void }> = ({ onNext }) => {
  return (
    <div>
      <MainTitle>이제 마지막이에요!</MainTitle>
      <Description>EatMate에서 사용할 프로필 사진을 추가해주세요.</Description>

      <ButtonContainer>
        <Button onClick={onNext} variant="primary" size="lg" rounded="sm">
          회원가입 진행하기
        </Button>
      </ButtonContainer>
    </div>
  );
};

export default ProfileImgStep;
