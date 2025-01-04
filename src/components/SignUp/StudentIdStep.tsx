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
import { useState } from 'react';
import { signupAtom } from '@/recoil/atoms/userAtom';
import errorCheck from '@/assets/images/error_check.svg';

const StudentIdStep: React.FC<{ onNext: () => void }> = ({ onNext }) => {
  const [signupState, setSignupState] = useRecoilState(signupAtom);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleInputChange = (value: string) => {
    setSignupState((prev) => ({ ...prev, studentId: value }));

    if (!/^\d*$/.test(value)) {
      setErrorMessage('숫자만 입력 가능합니다.');
    } else if (value.length < 9) {
      setErrorMessage('올바른 학번을 입력해주세요.');
    } else {
      setErrorMessage('');
    }
  };

  const isFormValid =
    signupState.studentId.length === 9 && /^\d+$/.test(signupState.studentId);
  return (
    <div>
      <MainTitle>학교 인증을 위해</MainTitle>
      <MainTitle>학번을 입력해 주세요!</MainTitle>
      <Description>
        입력한 학번은 인증 용도로만 사용되며, 안전하게 보호됩니다.
      </Description>

      <InputContainer>
        <SignUpInput
          type="tel"
          inputMode="numeric"
          maxLength={9}
          placeholder="ex) 202534999"
          value={signupState.studentId}
          onChange={(e) => handleInputChange(e.target.value)}
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
          disabled={!isFormValid}
        >
          다음
        </Button>
      </ButtonContainer>
    </div>
  );
};

export default StudentIdStep;
