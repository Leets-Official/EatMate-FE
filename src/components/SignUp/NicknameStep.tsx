import Button from '../common/Button/Button';

const NicknameStep: React.FC<{ onNext: () => void }> = ({ onNext }) => {
  return (
    <div>
      닉네임입력
      <Button onClick={onNext} variant="primary" size="lg" rounded="sm">
        다음
      </Button>
    </div>
  );
};

export default NicknameStep;
