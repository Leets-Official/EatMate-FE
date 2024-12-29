import Button from '../common/Button/Button';

const MbtiStep: React.FC<{ onNext: () => void }> = ({ onNext }) => {
  return (
    <div>
      엠비티아이
      <Button onClick={onNext} variant="primary" size="lg" rounded="sm">
        다음
      </Button>
    </div>
  );
};

export default MbtiStep;
