import Header from '@/components/common/Header/Header';
import ProgressBar from '@/components/SignUp/ProgressBar';
import { Outlet, useLocation } from 'react-router-dom';

const stepPaths = [
  '/signup/birthday-gender',
  '/signup/phone-number',
  '/signup/mbti',
  '/signup/nickname',
  '/signup/student-id',
  '/signup/profile-image',
];

const SignupLayout: React.FC = () => {
  const location = useLocation();

  const currentStepIndex = stepPaths.indexOf(location.pathname);
  const progress = ((currentStepIndex + 1) / stepPaths.length) * 100;

  return (
    <div>
      <Header showBackButton={true} onBackClick={() => window.history.back()} />

      <ProgressBar progress={progress} />

      <Outlet />
    </div>
  );
};

export default SignupLayout;
