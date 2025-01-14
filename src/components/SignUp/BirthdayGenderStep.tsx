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
import { useNavigate } from 'react-router-dom';

const BirthdayGenderStep: React.FC = () => {
  const nav = useNavigate();
  const [signupState, setSignupState] = useRecoilState(signupAtom);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [touched, setTouched] = useState({
    year: false,
    month: false,
    day: false,
  });

  const { year, month, day, gender } = signupState;

  const birthInputFields: {
    label: string;
    key: keyof typeof signupState;
    maxLength: number;
    width: string;
  }[] = [
    { label: '년', key: 'year', maxLength: 4, width: '100px' },
    { label: '월', key: 'month', maxLength: 2, width: '40px' },
    { label: '일', key: 'day', maxLength: 2, width: '40px' },
  ];

  const handleInputChange = (key: string, value: string) => {
    setSignupState((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleGenderClick = (gender: string) => {
    setSignupState((prev) => ({ ...prev, gender }));
  };

  const handleBlur = (key: keyof typeof signupState) => {
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

  const handleNext = () => {
    if (isFormValid()) {
      nav('/signup/phone-number');
    }
  };

  useEffect(() => {
    console.log('signupState updated:', signupState);
  }, [signupState]);

  // 빌드 에러 임시 해결
  useEffect(() => {
    console.log(touched);
  }, [touched]);

  return (
    <div>
      <MainTitle>조금만 알려주시면 준비가 끝나요!</MainTitle>
      <Description>
        <div>나이와 성별을 선택해주세요.</div>
        <div>간단히 입력 후 다음으로 넘어갈 수 있어요. </div>
      </Description>
      <InputWrapper>
        <InputContainer>
          {birthInputFields.map(({ label, key, maxLength, width }) => (
            <>
              <SignUpInput
                type="text"
                maxLength={maxLength}
                width={width}
                value={signupState[key]}
                onChange={(e) => handleInputChange(key, e.target.value)}
                onBlur={() => handleBlur(key)}
              />
              <Text>{label}</Text>
            </>
          ))}
        </InputContainer>
        {errorMessage && <InputErrorMessage message={errorMessage} />}
      </InputWrapper>

      <SelectButtonContainer>
        <Button
          onClick={() => handleGenderClick('MALE')}
          variant={
            signupState.gender === 'MALE' ? 'primary' : 'primary-outline'
          }
          size="lg"
          rounded="sm"
        >
          남성
        </Button>
        <Button
          onClick={() => handleGenderClick('FEMALE')}
          variant={
            signupState.gender === 'FEMALE' ? 'primary' : 'primary-outline'
          }
          size="lg"
          rounded="sm"
        >
          여성
        </Button>
      </SelectButtonContainer>

      <ButtonContainer>
        <Button
          onClick={handleNext}
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
