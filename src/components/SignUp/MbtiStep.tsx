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
import InputErrorMessage from '../common/Error/InputErrorMessage';
import {
  isAllMbtiInputsValid,
  validateMbtiInput,
} from '@/utils/validate-input';
import { useNavigate } from 'react-router-dom';

const MbtiStep: React.FC = () => {
  const nav = useNavigate();

  const [signupState, setSignupState] = useRecoilState(signupAtom);
  const [errors, setErrors] = useState([false, false, false, false]);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleInputChange = (index: number, value: string) => {
    const upperValue = value.toUpperCase();
    const isValid = validateMbtiInput(upperValue, index);

    const newErrors = [...errors];
    newErrors[index] = !isValid;
    setErrors(newErrors);

    const newMbti = [...signupState.mbti];
    newMbti[index] = upperValue;
    setSignupState((prev) => ({ ...prev, mbti: newMbti.join('') }));

    if (!isValid && value !== '') {
      setErrorMessage('다시 입력해주세요.');
    } else setErrorMessage('');
  };

  const mbtiLetters = ['E/I', 'N/S', 'F/T', 'P/J'];
  const allInputsValid = isAllMbtiInputsValid(signupState.mbti);
  const anyInputSelected = signupState.mbti
    .split('')
    .some((char) => char !== '');

  const handleNext = () => {
    if (allInputsValid) {
      nav('/signup/nickname');
    }
  };

  useEffect(() => {
    console.log('signupState updated:', signupState);
  }, [signupState]);

  return (
    <div>
      <MainTitle>MBTI를 알고계시나요?</MainTitle>
      <Description>다른 사용자들이 당신을 더 잘 이해할 수 있어요.</Description>

      <InputContainer>
        {mbtiLetters.map((letters, index) => (
          <SignUpInput
            type="text"
            inputMode="text"
            maxLength={1}
            value={signupState.mbti[index] || ''}
            width="50px"
            onChange={(e) => handleInputChange(index, e.target.value)}
            error={errors[index]}
          />
        ))}
      </InputContainer>
      {errorMessage && <InputErrorMessage message={errorMessage} />}

      <ButtonContainer>
        <Button
          onClick={handleNext}
          variant="primary"
          size="lg"
          rounded="sm"
          disabled={!allInputsValid}
        >
          {anyInputSelected ? '다음' : '나중에 하기'}
        </Button>
      </ButtonContainer>
    </div>
  );
};

export default MbtiStep;
