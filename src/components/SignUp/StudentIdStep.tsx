import Button from '../common/Button/Button';

const StudentIdStep: React.FC<{ onNext: () => void }> = ({ onNext }) => {
  return (
    <div>
      학번
      <Button onClick={onNext} variant="primary" size="lg" rounded="sm">
        다음
      </Button>
    </div>
  );
};

export default StudentIdStep;
