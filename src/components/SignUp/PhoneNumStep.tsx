import {
  ButtonContainer,
  Description,
  InputContainer,
  InputWrapper,
  MainTitle,
} from '@/styles/SignUp/SignUp.styled';
import Button from '@/components/common/Button/Button';
import SignUpInput from './SignupInput';
import { useRecoilState } from 'recoil';
import { signupAtom } from '@/recoil/atoms/userAtom';
import { useState, useEffect } from 'react';
import InputErrorMessage from '@/components/common/Input/InputErrorMessage';
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
      setErrorMessage('올바른 전화번호를 입력해주세요.');
    } else {
      setErrorMessage('');
    }
  };

  const handleNext = () => {
    if (isFormValid()) {
      nav('/signup/nickname');
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
      <MainTitle>전화번호를 입력하세요.</MainTitle>

      <InputContainer>
        <InputWrapper>
          <SignUpInput
            type="tel"
            maxLength={13}
            inputMode="numeric"
            placeholder="전화번호 입력"
            value={signupState.phoneNumber}
            onChange={(e) => handleInputChange(e.target.value)}
            onBlur={handleBlur}
            error={!!errorMessage}
          />
          {!errorMessage ? (
            <Description>
              입력된 정보는 한번 저장하면 변경할 수 없어요!
            </Description>
          ) : (
            <InputErrorMessage message={errorMessage} />
          )}
        </InputWrapper>
      </InputContainer>

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
