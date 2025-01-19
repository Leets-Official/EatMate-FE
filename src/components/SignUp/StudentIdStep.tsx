import {
  ButtonContainer,
  Description,
  InputContainer,
  MainTitle,
} from '@/styles/SignUp/SignUp.styled';
import Button from '@/components/common/Button/Button';
import SignUpInput from './SignupInput';
import { useRecoilState } from 'recoil';
import { useState } from 'react';
import { signupAtom } from '@/recoil/atoms/userAtom';
import InputErrorMessage from '@/components/common/Input/InputErrorMessage';
import { isStudentIdValid, validateStudentId } from '@/utils/validate-input';
import { useNavigate } from 'react-router-dom';

const StudentIdStep: React.FC = () => {
  const nav = useNavigate();

  const [signupState, setSignupState] = useRecoilState(signupAtom);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleInputChange = (value: string) => {
    const numericValue = value === '' ? null : parseInt(value, 10);
    setSignupState((prev) => ({ ...prev, studentNumber: numericValue }));

    const validationError = validateStudentId(numericValue);
    setErrorMessage(validationError || '');
  };

  const handleNext = () => {
    if (isFormValid) {
      nav('/signup/profile-img');
    }
  };

  const isFormValid = isStudentIdValid(signupState.studentNumber);
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
          value={signupState.studentNumber}
          onChange={(e) => handleInputChange(e.target.value)}
        />
      </InputContainer>
      {errorMessage && <InputErrorMessage message={errorMessage} />}

      <ButtonContainer>
        <Button
          onClick={handleNext}
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
