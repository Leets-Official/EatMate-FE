import Header from '@/components/common/Header/Header';
import ProgressBar from '@/components/SignUp/ProgressBar';
import { Outlet, useLocation } from 'react-router-dom';

const SignupLayout: React.FC = () => {
  const location = useLocation();

  const stepPaths = [
    '/signup/birthday-gender',
    '/signup/phone-number',
    '/signup/mbti',
    '/signup/nickname',
    '/signup/student-id',
    '/signup/profile-image',
  ];

  const currentStepIndex = stepPaths.indexOf(location.pathname);
  const progress = ((currentStepIndex + 1) / stepPaths.length) * 100;

  return (
    <div>
      <Header
        showBackButton={currentStepIndex > 0}
        onBackClick={() => window.history.back()}
      />

      <ProgressBar progress={progress} />

      <Outlet />
    </div>
  );
};

export default SignupLayout;
