import Button from '@/components/common/Button/Button';
import {
  MainTitle,
  Description,
  Text,
  InputContainer,
  ButtonContainer,
  SelectButtonContainer,
  InputWrapper,
} from '@/styles/SignUp/SignUp.styled';
import SignUpInput from './SignupInput';
import { signupAtom, SignupState } from '@/recoil/atoms/userAtom';
import { UseInputHandler } from '@/hooks/useInputHandler';
import InputErrorMessage from '../common/Error/InputErrorMessage';
import {
  validateDay,
  validateMonth,
  validateYear,
} from '@/utils/validate-input';

const BirthdayGenderStep: React.FC<{ onNext: () => void }> = ({ onNext }) => {
  const { state, handleInputChange, errorMessage, isFormValid, setState } =
    UseInputHandler<SignupState>({
      atom: signupAtom,
      validate: (key, value, currentState) => {
        if (key === 'year') return validateYear(value) as string | null;
        if (key === 'month') return validateMonth(value) as string | null;
        if (key === 'day')
          return validateDay(value, currentState.year, currentState.month) as
            | string
            | null;
        return null;
      },
    });

  const birthInputFields: {
    label: string;
    key: keyof SignupState;
    maxLength: number;
    width: string;
  }[] = [
    { label: '년', key: 'year', maxLength: 4, width: '100px' },
    { label: '월', key: 'month', maxLength: 2, width: '40px' },
    { label: '일', key: 'day', maxLength: 2, width: '40px' },
  ];

  const handleGenderClick = (gender: string) => {
    setState((prev: SignupState) => ({ ...prev, gender }));
  };

  return (
    <div>
      <MainTitle>조금만 알려주시면 준비가 끝나요!</MainTitle>
      <Description>
        <div>나이와 성별을 선택해주세요.</div>
        <div>간단히 입력 후 다음으로 넘어갈 수 있어요. </div>
      </Description>
      <InputWrapper>
        <InputContainer>
          {birthInputFields.map(({ label, key, maxLength, width }) => (
            <>
              <SignUpInput
                type="text"
                maxLength={maxLength}
                width={width}
                value={state[key]}
                onChange={(e) => handleInputChange(key, e.target.value)}
              />
              <Text>{label}</Text>
            </>
          ))}
        </InputContainer>
        {errorMessage && <InputErrorMessage message={errorMessage} />}
      </InputWrapper>

      <SelectButtonContainer>
        <Button
          onClick={() => handleGenderClick('남성')}
          variant={state.gender === '남성' ? 'primary' : 'primary-outline'}
          size="lg"
          rounded="sm"
        >
          남성
        </Button>
        <Button
          onClick={() => handleGenderClick('여성')}
          variant={state.gender === '여성' ? 'primary' : 'primary-outline'}
          size="lg"
          rounded="sm"
        >
          여성
        </Button>
      </SelectButtonContainer>

      <ButtonContainer>
        <Button
          onClick={onNext}
          variant="primary"
          size="lg"
          rounded="sm"
          disabled={!isFormValid()}
        >
          다음
        </Button>
      </ButtonContainer>
    </div>
  );
};

export default BirthdayGenderStep;
