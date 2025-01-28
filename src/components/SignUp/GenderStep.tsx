import Button from '@/components/common/Button/Button';
import { MainTitle, ButtonContainer } from '@/styles/SignUp/SignUp.styled';
import { useRecoilState } from 'recoil';
import { signupAtom } from '@/recoil/atoms/userAtom';
import { useNavigate } from 'react-router-dom';
import * as S from '@/styles/SignUp/SignUp.styled';
import ManIcon from '@/assets/images/ic_gender_man.svg';
import WomanIcon from '@/assets/images/ic_gender_woman.svg';
import { useEffect } from 'react';

const GenderStep: React.FC = () => {
  const nav = useNavigate();
  const [signupState, setSignupState] = useRecoilState(signupAtom);

  const handleGenderClick = (gender: 'MALE' | 'FEMALE') => {
    setSignupState((prev) => ({ ...prev, gender }));
  };

  const isFormValid = () => {
    return signupState.gender !== '';
  };

  const handleNext = () => {
    if (isFormValid()) {
      nav('/signup/student-id');
    }
  };

  useEffect(() => {
    console.log('signupState updated:', signupState);
  }, [signupState]);

  return (
    <div>
      <MainTitle>성별을 선택해주세요</MainTitle>

      <S.GenderContainer>
        <S.GenderOption
          isSelected={signupState.gender === 'MALE'}
          onClick={() => handleGenderClick('MALE')}
        >
          <S.GenderIcon src={ManIcon} alt="남성" />
          <span>남성</span>
        </S.GenderOption>

        <S.GenderOption
          isSelected={signupState.gender === 'FEMALE'}
          onClick={() => handleGenderClick('FEMALE')}
        >
          <S.GenderIcon src={WomanIcon} alt="여성" />
          <span>여성</span>
        </S.GenderOption>
      </S.GenderContainer>

      <ButtonContainer>
        <Button
          onClick={handleNext}
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

export default GenderStep;
