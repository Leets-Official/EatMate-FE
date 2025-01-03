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

const MbtiStep: React.FC<{ onNext: () => void }> = ({ onNext }) => {
  const [signupState, setSignupState] = useRecoilState(signupAtom);
  const [errors, setErrors] = useState([false, false, false, false]);

  const constraints = [
    /^[EIei]$/, // 첫 번째 input: E, I
    /^[NSns]$/, // 두 번째 input: N, S
    /^[FTft]$/, // 세 번째 input: F, T
    /^[PJpj]$/, // 네 번째 input: P, J
  ];

  const handleInputChange = (index: number, value: string) => {
    const upperValue = value.toUpperCase();
    const isValid = constraints[index].test(upperValue);

    const newErrors = [...errors];
    newErrors[index] = !isValid;
    setErrors(newErrors);

    if (isValid || value === '') {
      const newMbti = [...signupState.mbti];
      newMbti[index] = upperValue;
      setSignupState((prev) => ({ ...prev, mbti: newMbti.join('') }));
    }
  };

  const allInputsFilled =
    signupState.mbti.length === 4 && !errors.includes(true);
  const anyInputFilled = signupState.mbti.length > 0;

  const mbtiLetters = ['E/I', 'N/S', 'F/T', 'P/J'];

  return (
    <div>
      <MainTitle>MBTI를 알고계시나요?</MainTitle>
      <Description>다른 사용자들이 당신을 더 잘 이해할 수 있어요.</Description>

      <InputContainer>
        {mbtiLetters.map((letters, index) => (
          <SignUpInput
            type="text"
            key={letters}
            value={signupState.mbti[index] || ''}
            width="50px"
            onChange={(e) => handleInputChange(index, e.target.value)}
            error={errors[index]}
            errorMessage="다시 입력해주세요"
          />
        ))}
      </InputContainer>

      <ButtonContainer>
        <Button
          onClick={onNext}
          variant="primary"
          size="lg"
          rounded="sm"
          disabled={!allInputsFilled && !anyInputFilled}
        >
          {allInputsFilled ? '다음' : '나중에 하기'}
        </Button>
      </ButtonContainer>
    </div>
  );
};

export default MbtiStep;
