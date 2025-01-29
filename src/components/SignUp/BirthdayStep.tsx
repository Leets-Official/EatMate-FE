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
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { year, month, day, nickname } = signupState;

  const birthInputFields = [
    { label: '년', key: 'year', maxLength: 4, width: '100px' },
    { label: '월', key: 'month', maxLength: 2, width: '40px' },
    { label: '일', key: 'day', maxLength: 2, width: '40px' },
  ] as const;

  const handleInputChange = (key: 'year' | 'month' | 'day', value: string) => {
    const numericValue = value.replace(/[^0-9]/g, '');
    setSignupState((prev) => ({
      ...prev,
      [key]: numericValue ? Number(numericValue) : null,
    }));
  };

  const validateBirthdate = () => {
    if (
      validateYear(year) !== true ||
      validateMonth(month) !== true ||
      validateDay(day, year, month) !== true
    ) {
      return '올바른 생년월일을 입력해주세요.';
    }
    return null;
  };

  const isFormValid = () => {
    return errorMessage === null;
  };

  const handleNext = () => {
    if (isFormValid()) {
      nav('/signup/gender');
    }
  };

  useEffect(() => {
    setErrorMessage(validateBirthdate());
  }, [year, month, day]);

  useEffect(() => {
    console.log('signupState updated:', signupState);
  }, [signupState]);

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
                type="tel"
                inputMode="numeric"
                maxLength={maxLength}
                width={width}
                value={
                  signupState[key] !== null ? signupState[key]?.toString() : ''
                }
                onChange={(e) => handleInputChange(key, e.target.value)}
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
