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
import { useState } from 'react';
import InputErrorMessage from '../common/Error/InputErrorMessage';
import { isNicknameValid, validateNickname } from '@/utils/validate-input';

const NicknameStep: React.FC<{ onNext: () => void }> = ({ onNext }) => {
  const [signupState, setSignupState] = useRecoilState(signupAtom);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleInputChange = (value: string) => {
    setSignupState((prev) => ({ ...prev, nickname: value }));

    const validationError = validateNickname(value);
    setErrorMessage(validationError || '');
  };

  const isFormValid = isNicknameValid(signupState.nickname);

  return (
    <div>
      <MainTitle>당신을 더 알고 싶어요!</MainTitle>
      <Description>뭐라고 불러드리면 될까요?</Description>

      <InputContainer>
        <SignUpInput
          type="text"
          placeholder="ex) 무한이"
          value={signupState.nickname}
          onChange={(e) => handleInputChange(e.target.value)}
        />
      </InputContainer>
      {errorMessage && <InputErrorMessage message={errorMessage} />}

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

export default NicknameStep;
