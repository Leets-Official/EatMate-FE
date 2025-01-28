import Button from '@/components/common/Button/Button';
import {
  MainTitle,
  Description,
  Text,
  InputContainer,
  ButtonContainer,
  InputWrapper,
  Padding,
} from '@/styles/SignUp/SignUp.styled';
import { useEffect, useState } from 'react';
import SignUpInput from './SignupInput';
import { useRecoilState } from 'recoil';
import { signupAtom } from '@/recoil/atoms/userAtom';
import InputErrorMessage from '@/components/common/Input/InputErrorMessage';
import {
  validateDay,
  validateMonth,
  validateYear,
} from '@/utils/validate-input';
import { useNavigate } from 'react-router-dom';

const BirthdayStep: React.FC = () => {
  const nav = useNavigate();
  const [signupState, setSignupState] = useRecoilState(signupAtom);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [touched, setTouched] = useState({
    year: false,
    month: false,
    day: false,
  });

  const { year, month, day, nickname } = signupState;

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

  const handleInputChange = (key: keyof typeof signupState, value: string) => {
    const numericValue = value === '' ? null : parseInt(value, 10);
    setSignupState((prev) => ({
      ...prev,
      [key]: numericValue,
    }));
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
      validateDay(day, year, month) === true
    );
  };

  const handleNext = () => {
    if (isFormValid()) {
      nav('/signup/gender');
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
      <MainTitle>
        {nickname ? `${nickname} 님,` : ''}
        <br />
        생일이 언제시죠?
      </MainTitle>
      <InputWrapper>
        <InputContainer>
          {birthInputFields.map(({ label, key, maxLength, width }) => (
            <>
              <SignUpInput
                type="text"
                maxLength={maxLength}
                width={width}
                value={
                  signupState[key] !== null ? signupState[key]?.toString() : ''
                }
                onChange={(e) => handleInputChange(key, e.target.value)}
                onBlur={() => handleBlur(key)}
                error={!!errorMessage}
              />
              <Text>{label}</Text>
            </>
          ))}
        </InputContainer>
        <Padding>
          {!errorMessage ? (
            <Description>
              입력된 정보는 한 번 저장하면 변경할 수 없어요!
            </Description>
          ) : (
            <InputErrorMessage message={errorMessage} />
          )}
        </Padding>
      </InputWrapper>

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

export default BirthdayStep;
