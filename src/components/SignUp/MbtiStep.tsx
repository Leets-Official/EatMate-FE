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
import { useState, useEffect } from 'react';
import InputErrorMessage from '@/components/common/Input/InputErrorMessage';
import { validateMbti } from '@/utils/validate-input';
import { useNavigate } from 'react-router-dom';
import PolicyAgreementModal from '@/components/common/Modal/PolicyAgreementModal';
import { signupUser } from '@/apis/auth/auth';

const MbtiStep: React.FC = () => {
  const nav = useNavigate();
  const [signupState, setSignupState] = useRecoilState(signupAtom);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isPolicyModalOpen, setIsPolicyModalOpen] = useState(false);

  const handleInputChange = (value: string) => {
    const upperValue = value.toUpperCase();
    setSignupState((prev) => ({ ...prev, mbti: upperValue }));

    const isValid = validateMbti(upperValue);
    setErrorMessage(
      isValid || value === '' ? '' : '올바른 MBTI를 입력해주세요.'
    );
  };

  const isInputEmpty = signupState.mbti.trim() === '';

  const handleNext = () => {
    setIsPolicyModalOpen(true);
  };

  const handleAgreePolicy = async () => {
    // try {
    //   await signupUser({
    //     nickname: signupState.nickname,
    //     mbti: signupState.mbti,
    //     phoneNumber: signupState.phoneNumber,
    //     studentNumber: signupState.studentNumber,
    //     gender: signupState.gender,
    //     year: signupState.year,
    //     month: signupState.month,
    //     day: signupState.day,
    //     profileImage: signupState.profileImage || null,
    // });
    setIsPolicyModalOpen(false);
    nav('/signup/success');
    // } catch (error) {
    //   if (error instanceof Error) {
    //     console.error(`회원가입 처리 중 오류가 발생했습니다: ${error.message}`);
    //   } else {
    //     console.error('회원가입 중 알 수 없는 오류가 발생했습니다.');
    //   }
    //   console.error('회원가입 처리 중 오류가 발생했습니다.', error);
    // }
  };

  const handleCloseModal = () => {
    setIsPolicyModalOpen(false);
  };

  useEffect(() => {
    console.log('signupState updated:', signupState);
  }, [signupState]);

  return (
    <div>
      <MainTitle>MBTI를 알려주세요</MainTitle>

      <InputContainer>
        <InputWrapper>
          <SignUpInput
            type="text"
            inputMode="text"
            maxLength={4}
            placeholder="MBTI 입력"
            value={signupState.mbti}
            onChange={(e) => handleInputChange(e.target.value)}
            error={!!errorMessage}
          />
          {!errorMessage ? (
            <Description>
              다른 사용자들이 <br />
              당신을 더 잘 이해할 수 있어요.
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
          disabled={!!errorMessage}
        >
          {isInputEmpty ? '나중에 추가하기' : '다음'}
        </Button>
      </ButtonContainer>

      {isPolicyModalOpen && (
        <PolicyAgreementModal
          onAgree={handleAgreePolicy}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default MbtiStep;
