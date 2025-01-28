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
import { useEffect, useState } from 'react';
import { signupAtom } from '@/recoil/atoms/userAtom';
import InputErrorMessage from '@/components/common/Input/InputErrorMessage';
import { isStudentIdValid, validateStudentId } from '@/utils/validate-input';
import { useNavigate } from 'react-router-dom';

const StudentIdStep: React.FC = () => {
  const nav = useNavigate();

  const [signupState, setSignupState] = useRecoilState(signupAtom);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleInputChange = (value: string) => {
    const numericValue = value.replace(/\D/g, '');

    setSignupState((prev) => ({
      ...prev,
      studentNumber: numericValue ? parseInt(numericValue, 10) : null,
    }));

    const validationError = validateStudentId(
      numericValue ? parseInt(numericValue, 10) : null
    );
    setErrorMessage(validationError || '');
  };

  const handleNext = () => {
    if (isFormValid) {
      nav('/signup/mbti');
    }
  };

  useEffect(() => {
    console.log('signupState updated:', signupState);
  }, [signupState]);

  const isFormValid = isStudentIdValid(signupState.studentNumber);
  return (
    <div>
      <MainTitle>학번을 입력해 주세요!</MainTitle>

      <InputContainer>
        <InputWrapper>
          <SignUpInput
            type="tel"
            inputMode="numeric"
            placeholder="학번 입력"
            value={signupState.studentNumber}
            onChange={(e) => handleInputChange(e.target.value)}
            error={!!errorMessage}
          />
          {!errorMessage ? (
            <Description>
              입력된 정보는 <br />한 번 저장하면 변경할 수 없어요!
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
          disabled={!isFormValid}
        >
          다음
        </Button>
      </ButtonContainer>
    </div>
  );
};

export default StudentIdStep;
