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

const PhoneNumStep: React.FC<{ onNext: () => void }> = ({ onNext }) => {
  const [signupState, setSignupState] = useRecoilState(signupAtom);
  const [error, setError] = useState(false);

  const formatPhoneNumber = (value: string) => {
    const cleaned = value.replace(/\D+/g, '');
    const match = cleaned.match(/^(\d{3})(\d{0,4})(\d{0,4})$/);
    if (match) {
      return [match[1], match[2], match[3]].filter(Boolean).join('-');
    }
    return value;
  };

  const handleInputChange = (value: string) => {
    const formatted = formatPhoneNumber(value);
    setSignupState((prev) => ({ ...prev, phoneNumber: formatted }));

    if (formatted.replace(/-/g, '').length === 11) {
      setError(false);
    } else {
      setError(true);
    }
  };

  useEffect(() => {
    console.log('signupState updated:', signupState);
  }, [signupState]);
  return (
    <div>
      <MainTitle>전화번호를 입력해주세요.</MainTitle>
      <Description>
        입력된 정보는 외부에 공개되지 않으니 안심하세요.
      </Description>

      <InputContainer>
        <SignUpInput
          type="text"
          placeholder="010-0000-0000"
          value={signupState.phoneNumber}
          onChange={(e) => handleInputChange(e.target.value)}
          error={error}
          errorMessage="다시 입력해주세요"
        />
      </InputContainer>

      <ButtonContainer>
        <Button
          onClick={onNext}
          variant="primary"
          size="lg"
          rounded="sm"
          disabled={
            error || signupState.phoneNumber.replace(/-/g, '').length !== 11
          }
        >
          다음
        </Button>
      </ButtonContainer>
    </div>
  );
};

export default PhoneNumStep;
