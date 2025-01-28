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
import { useState } from 'react';
import InputErrorMessage from '@/components/common/Input/InputErrorMessage';
import { isNicknameValid, validateNickname } from '@/utils/validate-input';
import { useNavigate } from 'react-router-dom';

const NicknameStep: React.FC = () => {
  const nav = useNavigate();

  const [signupState, setSignupState] = useRecoilState(signupAtom);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleInputChange = (value: string) => {
    setSignupState((prev) => ({ ...prev, nickname: value }));

    const validationError = validateNickname(value);
    setErrorMessage(validationError || '');
  };

  const handleNext = () => {
    if (isFormValid) {
      nav('/signup/student-id');
    }
  };

  const isFormValid = isNicknameValid(signupState.nickname);

  return (
    <div>
      <MainTitle>닉네임을 입력하세요</MainTitle>

      <InputContainer>
        <InputWrapper>
          <SignUpInput
            type="text"
            placeholder="ex) 무한이"
            value={signupState.nickname}
            onChange={(e) => handleInputChange(e.target.value)}
            error={!!errorMessage}
          />
          {!errorMessage ? (
            <Description>
              잇메이트에서 사용할 고유의 닉네임을 만드세요. 12자 이내
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

export default NicknameStep;
