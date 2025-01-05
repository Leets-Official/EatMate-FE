import {
  ButtonContainer,
  Description,
  InputContainer,
  MainTitle,
} from '@/styles/SignUp/SignUp.styled';
import Button from '@/components/common/Button/Button';
import SignUpInput from './SignupInput';
import { useRecoilState } from 'recoil';
import { signupAtom } from '@/recoil/atoms/userAtom';
import { useState, useEffect } from 'react';
import InputErrorMessage from '@/components/common/Error/InputErrorMessage';
import { formatPhoneNumber, validatePhoneNumber } from '@/utils/validate-input';
import { useNavigate } from 'react-router-dom';

const PhoneNumStep: React.FC = () => {
  const nav = useNavigate();

  const [signupState, setSignupState] = useRecoilState(signupAtom);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleInputChange = (value: string) => {
    const formatted = formatPhoneNumber(value);
    setSignupState((prev) => ({ ...prev, phoneNumber: formatted }));
  };

  const handleBlur = () => {
    if (!validatePhoneNumber(signupState.phoneNumber)) {
      setErrorMessage('다시 입력해주세요.');
    } else {
      setErrorMessage('');
    }
  };

  const handleNext = () => {
    if (isFormValid()) {
      nav('/signup/mbti');
    }
  };

  useEffect(() => {
    console.log('signupState updated:', signupState);
  }, [signupState]);

  const isFormValid = () => {
    return validatePhoneNumber(signupState.phoneNumber);
  };

  return (
    <div>
      <MainTitle>전화번호를 입력해주세요.</MainTitle>
      <Description>
        입력된 정보는 외부에 공개되지 않으니 안심하세요.
      </Description>

      <InputContainer>
        <SignUpInput
          type="tel"
          maxLength={13}
          inputMode="numeric"
          placeholder="010-0000-0000"
          value={signupState.phoneNumber}
          onChange={(e) => handleInputChange(e.target.value)}
          onBlur={handleBlur}
        />
      </InputContainer>

      {errorMessage && <InputErrorMessage message={errorMessage} />}
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

export default PhoneNumStep;
