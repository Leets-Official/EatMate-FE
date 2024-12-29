import Button from '../common/Button/Button';

const ProfileImgStep: React.FC<{ onNext: () => void }> = ({ onNext }) => {
  return (
    <div>
      프로필사진
      <Button onClick={onNext} variant="primary" size="lg" rounded="sm">
        다음
      </Button>
    </div>
  );
};

export default ProfileImgStep;
