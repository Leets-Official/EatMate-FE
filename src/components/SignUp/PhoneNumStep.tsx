import Button from '../common/Button/Button';

const PhoneNumStep: React.FC<{ onNext: () => void }> = ({ onNext }) => {
  return (
    <div>
      번호입력
      <Button onClick={onNext} variant="primary" size="lg" rounded="sm">
        다음
      </Button>
    </div>
  );
};

export default PhoneNumStep;
