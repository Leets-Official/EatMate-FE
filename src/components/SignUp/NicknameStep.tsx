import {
  ButtonContainer,
  Description,
  InputContainer,
  ErrorContainer,
  MainTitle,
} from '@/styles/SignUp/SignUp.styled';
import Button from '@/components/common/Button/Button';
import SignUpInput from './SignupInput';
import { useRecoilState } from 'recoil';
import { signupAtom } from '@/recoil/atoms/userAtom';
import { useState } from 'react';
import errorCheck from '@/assets/images/error_check.svg';

const NicknameStep: React.FC<{ onNext: () => void }> = ({ onNext }) => {
  const [signupState, setSignupState] = useRecoilState(signupAtom);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const nicknameRegex = /^[가-힣a-zA-Z0-9]+$/;

  const handleInputChange = (value: string) => {
    setSignupState((prev) => ({ ...prev, nickname: value }));

    if (value.length < 2 || value.length > 12) {
      setErrorMessage('2-12자 이내로 입력해주세요.');
    } else if (!nicknameRegex.test(value)) {
      setErrorMessage('띄어쓰기 없이 한글,영문,숫자만 가능해요.');
    } else {
      setErrorMessage('');
    }
  };

  const isFormValid =
    signupState.nickname.length >= 2 &&
    signupState.nickname.length <= 12 &&
    nicknameRegex.test(signupState.nickname);

  return (
    <div>
      <MainTitle>당신을 더 알고 싶어요!</MainTitle>
      <Description>뭐라고 불러드리면 될까요?</Description>

      <InputContainer>
        <SignUpInput
          type="text"
          placeholder="닉네임"
          value={signupState.nickname}
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

export default NicknameStep;
