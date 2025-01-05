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
import InputErrorMessage from '../common/Error/InputErrorMessage';
import { isStudentIdValid, validateStudentId } from '@/utils/validate-input';
import { useNavigate } from 'react-router-dom';

const StudentIdStep: React.FC = () => {
  const nav = useNavigate();

  const [signupState, setSignupState] = useRecoilState(signupAtom);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleInputChange = (value: string) => {
    setSignupState((prev) => ({ ...prev, studentId: value }));

    const validationError = validateStudentId(value);
    setErrorMessage(validationError || '');
  };

  const handleNext = () => {
    if (isFormValid) {
      nav('/signup/profile-img'); // 다음 단계로 이동
    }
  };

  const isFormValid = isStudentIdValid(signupState.studentId);
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
