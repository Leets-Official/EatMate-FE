import Button from '../common/Button/Button';

const PolicyAgreementStep: React.FC<{ onAgree: () => void }> = ({
  onAgree,
}) => {
  return (
    <div>
      개인정보동의
      <Button onClick={onAgree} variant="primary" size="lg" rounded="sm">
        시작하기
      </Button>
    </div>
  );
};

export default PolicyAgreementStep;
