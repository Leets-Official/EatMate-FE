import ProgressBar from '../../components/SignUp/ProgressBar';
import BirthdayGenderStep from '../../components/SignUp/BirthdayGenderStep';
import { useState } from 'react';
import MbtiStep from '../../components/SignUp/MbtiStep';
import NicknameStep from '../../components/SignUp/NicknameStep';
import PhoneNumStep from '../../components/SignUp/PhoneNumStep';
import ProfileImgStep from '../../components/SignUp/ProfileImgStep';
import StudentIdStep from '../../components/SignUp/StudentIdStep';
import Header from '../../components/common/Header/Header';

const SignUp = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    <BirthdayGenderStep onNext={() => setCurrentStep((prev) => prev + 1)} />,
    <PhoneNumStep onNext={() => setCurrentStep((prev) => prev + 1)} />,
    <MbtiStep onNext={() => setCurrentStep((prev) => prev + 1)} />,
    <NicknameStep onNext={() => setCurrentStep((prev) => prev + 1)} />,
    <StudentIdStep onNext={() => setCurrentStep((prev) => prev + 1)} />,
    <ProfileImgStep onNext={() => setCurrentStep((prev) => prev + 1)} />,
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
    </div>
  );
};
export default SignUp;
