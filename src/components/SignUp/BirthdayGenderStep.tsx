import Button from '../common/Button/Button';
import {
  MainTitle,
  Description,
  Text,
  InputContainer,
  ButtonContainer,
  SelectButtonContainer,
} from '../../styles/SignUp/SignUp.styled';
import SignUpInput from './SignupInput';
import { useState } from 'react';

const BirthdayGenderStep: React.FC<{ onNext: () => void }> = ({ onNext }) => {
  const [selectedGender, setSelectedGender] = useState<string | null>(null);

  const handleGenderClick = (gender: string) => {
    setSelectedGender(gender);
  };

  return (
    <div>
      <MainTitle>조금만 알려주시면 준비가 끝나요!</MainTitle>
      <Description>
        <div>나이와 성별을 선택해주세요.</div>
        <div>간단히 입력 후 다음으로 넘어갈 수 있어요. </div>
      </Description>
      <InputContainer>
        <SignUpInput type="text" maxLength={4} width="100px" />
        <Text>년</Text>
        <SignUpInput type="text" maxLength={2} width="40px" />
        <Text>월</Text>
        <SignUpInput type="text" maxLength={2} width="40px" />
        <Text>일</Text>
      </InputContainer>

      <SelectButtonContainer>
        <Button
          onClick={() => handleGenderClick('남성')}
          variant={selectedGender === '남성' ? 'primary' : 'primary-outline'}
          size="lg"
          rounded="sm"
        >
          남성
        </Button>
        <Button
          onClick={() => handleGenderClick('여성')}
          variant={selectedGender === '여성' ? 'primary' : 'primary-outline'}
          size="lg"
          rounded="sm"
        >
          여성
        </Button>
      </SelectButtonContainer>

      <ButtonContainer>
        <Button onClick={onNext} variant="primary" size="lg" rounded="sm">
          다음
        </Button>
      </ButtonContainer>
    </div>
  );
};

export default BirthdayGenderStep;
