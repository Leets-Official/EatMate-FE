import { useState } from 'react';
import ProgressBar from '@/components/SignUp/ProgressBar';
import BirthdayGenderStep from '@/components/SignUp/BirthdayGenderStep';
import MbtiStep from '@/components/SignUp/MbtiStep';
import NicknameStep from '@/components/SignUp/NicknameStep';
import PhoneNumStep from '@/components/SignUp/PhoneNumStep';
import ProfileImgStep from '@/components/SignUp/ProfileImgStep';
import StudentIdStep from '@/components/SignUp/StudentIdStep';
import Header from '@/components/common/Header/Header';
import PolicyAgreementStep from '@/components/SignUp/PolicyAgreementStep';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPolicyModalOpen, setIsPolicyModalOpen] = useState(false);
  const nav = useNavigate();

  const steps = [
    <BirthdayGenderStep onNext={() => setCurrentStep((prev) => prev + 1)} />,
    <PhoneNumStep onNext={() => setCurrentStep((prev) => prev + 1)} />,
    <MbtiStep onNext={() => setCurrentStep((prev) => prev + 1)} />,
    <NicknameStep onNext={() => setCurrentStep((prev) => prev + 1)} />,
    <StudentIdStep onNext={() => setCurrentStep((prev) => prev + 1)} />,
    <ProfileImgStep onNext={() => setIsPolicyModalOpen(true)} />,
  ];
  const progress = ((currentStep + 1) / steps.length) * 100;

  const HandleBackClick = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  return (
    <div>
      <Header showBackButton={true} onBackClick={HandleBackClick} />
      <ProgressBar progress={progress} />
      {steps[currentStep]}
      {isPolicyModalOpen && (
        <PolicyAgreementStep
          onAgree={() => {
            setIsPolicyModalOpen(false);
            nav('/home');
          }}
        />
      )}
    </div>
  );
};
export default SignUp;
