import {
  ButtonContainer,
  Description,
  ErrorContainer,
  InputContainer,
  MainTitle,
} from '@/styles/SignUp/SignUp.styled';
import Button from '@/components/common/Button/Button';
import SignUpInput from './SignupInput';
import { useRecoilState } from 'recoil';
import { signupAtom } from '@/recoil/atoms/userAtom';
import { useState, useEffect } from 'react';
import errorCheck from '@/assets/images/error_check.svg';

const PhoneNumStep: React.FC<{ onNext: () => void }> = ({ onNext }) => {
  const [signupState, setSignupState] = useRecoilState(signupAtom);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const formatPhoneNumber = (value: string) => {
    const cleaned = value.replace(/\D+/g, ''); // 숫자만 남김
    const match = cleaned.match(/^(\d{3})(\d{0,4})(\d{0,4})$/); // 전화번호 형태로 포맷팅
    if (match) {
      return [match[1], match[2], match[3]].filter(Boolean).join('-');
    }
    return value;
  };

  const validatePhoneNumber = (value: string) => {
    const numericValue = value.replace(/-/g, '');
    return numericValue.length === 11;
  };

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

      {errorMessage && (
        <ErrorContainer>
          <img src={errorCheck} alt="check" />
          <span>{errorMessage}</span>
        </ErrorContainer>
      )}
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

export default PhoneNumStep;
