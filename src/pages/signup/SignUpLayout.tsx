import Header from '@/components/common/Header/Header';
import ProgressBar from '@/components/SignUp/ProgressBar';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

const stepPaths = [
  '/signup/birthday-gender',
  '/signup/phone-number',
  '/signup/mbti',
  '/signup/nickname',
  '/signup/student-id',
  '/signup/profile-img',
];

const SignupLayout: React.FC = () => {
  const location = useLocation();
  const nav = useNavigate();
  const currentStepIndex = stepPaths.indexOf(location.pathname);
  const progress = ((currentStepIndex + 1) / stepPaths.length) * 100;

  const handleBackClick = () => {
    if (location.pathname === '/signup/birthday-gender') {
      nav('/');
    } else if (currentStepIndex > 0) {
      nav(stepPaths[currentStepIndex - 1]);
    }
  };

  return (
    <div>
      <Header showBackButton={true} onBackClick={handleBackClick} />
      <ProgressBar progress={progress} />
      <Outlet />
    </div>
  );
};

export default SignupLayout;
