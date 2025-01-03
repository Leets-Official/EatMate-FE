import Button from '@/components/common/Button/Button';
import {
  MainTitle,
  Description,
  Text,
  InputContainer,
  ButtonContainer,
  SelectButtonContainer,
} from '@/styles/SignUp/SignUp.styled';
import SignUpInput from './SignupInput';
import { useRecoilState } from 'recoil';
import { signupAtom } from '@/recoil/atoms/userAtom';
import useInput from '@/hooks/use-input';

const BirthdayGenderStep: React.FC<{ onNext: () => void }> = ({ onNext }) => {
  const [signupState, setSignupState] = useRecoilState(signupAtom);

  const year = useInput(signupState.year);
  const month = useInput(signupState.month);
  const day = useInput(signupState.day);

  const handleGenderClick = (gender: string) => {
    setSignupState((prev) => ({ ...prev, gender }));
  };

  const validateYear = () => {
    return (
      /^\d{4}$/.test(year.value) &&
      +year.value >= 1900 &&
      +year.value <= new Date().getFullYear()
    );
  };

  const validateMonth = () => {
    return (
      /^\d{1,2}$/.test(month.value) && +month.value >= 1 && +month.value <= 12
    );
  };

  const validateDay = () => {
    const daysInMonth = new Date(+year.value, +month.value, 0).getDate();
    return (
      /^\d{1,2}$/.test(day.value) &&
      +day.value >= 1 &&
      +day.value <= daysInMonth
    );
  };

  const isFormValid = () => {
    return (
      validateYear() &&
      validateMonth() &&
      validateDay() &&
      signupState.gender! == ''
    );
  };
  return (
    <div>
      <MainTitle>조금만 알려주시면 준비가 끝나요!</MainTitle>
      <Description>
        <div>나이와 성별을 선택해주세요.</div>
        <div>간단히 입력 후 다음으로 넘어갈 수 있어요. </div>
      </Description>
      <InputContainer>
        <SignUpInput
          type="text"
          maxLength={4}
          width="100px"
          {...year}
          error={!validateYear()}
          errorMessage="올바른 년도를 입력해주세요"
        />
        <Text>년</Text>
        <SignUpInput
          type="text"
          maxLength={2}
          width="40px"
          {...month}
          error={!validateMonth()}
          errorMessage="1에서 12 사이의 숫자를 입력해주세요"
        />
        <Text>월</Text>
        <SignUpInput
          type="text"
          maxLength={2}
          width="40px"
          {...day}
          error={!validateDay()}
          errorMessage="1에서 31 사이의 숫자를 입력해주세요"
        />
        <Text>일</Text>
      </InputContainer>

      <SelectButtonContainer>
        <Button
          onClick={() => handleGenderClick('남성')}
          variant={
            signupState.gender === '남성' ? 'primary' : 'primary-outline'
          }
          size="lg"
          rounded="sm"
        >
          남성
        </Button>
        <Button
          onClick={() => handleGenderClick('여성')}
          variant={
            signupState.gender === '여성' ? 'primary' : 'primary-outline'
          }
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
