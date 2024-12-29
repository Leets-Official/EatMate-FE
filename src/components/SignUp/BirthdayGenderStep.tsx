import styled from 'styled-components';
import Button from '../common/Button/Button';

export const MainTitle = styled.div`
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.bold};
  font-size: 24px;
  padding: 10px;
`;

export const Description = styled.div`
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.semibold};
  font-size: 14px;
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 10px;
`;
const BirthdayGenderStep: React.FC<{ onNext: () => void }> = ({ onNext }) => {
  return (
    <div>
      <MainTitle>조금만 알려주시면 준비가 끝나요!</MainTitle>
      <Description>
        <div>나이와 성별을 선택해주세요.</div>
        <div>간단히 입력 후 다음으로 넘어갈 수 있어요. </div>
      </Description>
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
