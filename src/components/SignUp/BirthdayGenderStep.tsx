import Button from '../common/Button/Button';

const BirthdayGenderStep: React.FC<{ onNext: () => void }> = ({ onNext }) => {
  return (
    <div>
      <div>조금만 알려주시면 준비가 끝나요!</div>
      <div>나이와 성별을 선택해주세요.</div>
      <div>간단히 입력 후 다음으로 넘어갈 수 있어요. </div>
      <div>
        <input type="text" placeholder="년" />
        <input type="text" placeholder="월" />
        <input type="text" placeholder="일" />
      </div>
      <Button variant="primary-outline" size="lg" rounded="sm">
        남성
      </Button>
      <Button variant="primary-outline" size="lg" rounded="sm">
        여성
      </Button>
      <Button onClick={onNext} variant="primary" size="lg" rounded="sm">
        다음
      </Button>
    </div>
  );
};

export default BirthdayGenderStep;
