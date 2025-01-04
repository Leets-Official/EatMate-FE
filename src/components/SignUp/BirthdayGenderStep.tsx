import Button from '@/components/common/Button/Button';
import {
  MainTitle,
  Description,
  Text,
  InputContainer,
  ButtonContainer,
  SelectButtonContainer,
  InputWrapper,
} from '@/styles/SignUp/SignUp.styled';
import { useEffect, useState } from 'react';
import SignUpInput from './SignupInput';
import { useRecoilState } from 'recoil';
import { signupAtom } from '@/recoil/atoms/userAtom';
import InputErrorMessage from '../common/Error/InputErrorMessage';
import {
  validateDay,
  validateMonth,
  validateYear,
} from '@/utils/validate-input';

const BirthdayGenderStep: React.FC<{ onNext: () => void }> = ({ onNext }) => {
  const [signupState, setSignupState] = useRecoilState(signupAtom);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [touched, setTouched] = useState({
    year: false,
    month: false,
    day: false,
  });

  const { year, month, day, gender } = signupState;

  const handleInputChange = (key: string, value: string) => {
    setSignupState((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleGenderClick = (gender: string) => {
    setSignupState((prev) => ({ ...prev, gender }));
  };

  const handleBlur = (key: string) => {
    setTouched((prev) => ({
      ...prev,
      [key]: true,
    }));

    let error: string | true = '';
    if (key === 'year') error = validateYear(year);
    else if (key === 'month') error = validateMonth(month);
    else if (key === 'day') error = validateDay(day, year, month);

    if (error !== true) setErrorMessage(error as string);
    else setErrorMessage('');
  };

  const isFormValid = () => {
    return (
      validateYear(year) === true &&
      validateMonth(month) === true &&
      validateDay(day, year, month) === true &&
      gender !== ''
    );
  };

  useEffect(() => {
    console.log('signupState updated:', signupState);
  }, [signupState]);

  return (
    <div>
      <MainTitle>조금만 알려주시면 준비가 끝나요!</MainTitle>
      <Description>
        <div>나이와 성별을 선택해주세요.</div>
        <div>간단히 입력 후 다음으로 넘어갈 수 있어요. </div>
      </Description>
      <InputWrapper>
        <InputContainer>
          <SignUpInput
            type="text"
            maxLength={4}
            width="100px"
            onChange={(e) => handleInputChange('year', e.target.value)}
            onBlur={() => handleBlur('year')}
          />
          <Text>년</Text>

          <SignUpInput
            type="text"
            maxLength={2}
            width="40px"
            onChange={(e) => handleInputChange('month', e.target.value)}
            onBlur={() => handleBlur('month')}
          />
          <Text>월</Text>
          <SignUpInput
            type="text"
            maxLength={2}
            width="40px"
            onChange={(e) => handleInputChange('day', e.target.value)}
            onBlur={() => handleBlur('day')}
          />
          <Text>일</Text>
        </InputContainer>
        {errorMessage && <InputErrorMessage message={errorMessage} />}
      </InputWrapper>

      <SelectButtonContainer>
        <Button
          onClick={() => handleGenderClick('남성')}
          variant={
            signupState.gender === '남성' ? 'primary' : 'primary-outline'
          }
          size="lg"
          rounded="sm"
        >
          남성
        </Button>
        <Button
          onClick={() => handleGenderClick('여성')}
          variant={
            signupState.gender === '여성' ? 'primary' : 'primary-outline'
          }
          size="lg"
          rounded="sm"
        >
          여성
        </Button>
      </SelectButtonContainer>

      <ButtonContainer>
        <Button
          onClick={onNext}
          variant="primary"
          size="lg"
          rounded="sm"
          disabled={!isFormValid()}
        >
          다음
        </Button>
      </ButtonContainer>
    </div>
  );
};

export default BirthdayGenderStep;
