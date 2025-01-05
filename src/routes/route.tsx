import { createBrowserRouter } from 'react-router-dom';
import Home from '@/pages/Home';
import Intro from '@/pages/SignUpPage/Intro';
import PolicyDetails from '@/pages/SignUpPage/PolicyDetails';
import BirthdayGenderStep from '@/components/SignUp/BirthdayGenderStep';
import PhoneNumStep from '@/components/SignUp/PhoneNumStep';
import MbtiStep from '@/components/SignUp/MbtiStep';
import NicknameStep from '@/components/SignUp/NicknameStep';
import StudentIdStep from '@/components/SignUp/StudentIdStep';
import ProfileImgStep from '@/components/SignUp/ProfileImgStep';
import SignupLayout from '@/pages/SignUpPage/SignUpLayout';

const router = createBrowserRouter([
  {
    path: '',
    element: <Intro />,
  },
  {
    path: '/signup',
    element: <SignupLayout />,
    children: [
      {
        path: 'birthday-gender',
        element: <BirthdayGenderStep />,
      },
      {
        path: 'phone-number',
        element: <PhoneNumStep />,
      },
      {
        path: 'mbti',
        element: <MbtiStep />,
      },
      {
        path: 'nickname',
        element: <NicknameStep />,
      },
      {
        path: 'student-id',
        element: <StudentIdStep />,
      },
      {
        path: 'profile-img',
        element: <ProfileImgStep />,
      },
    ],
  },
  {
    path: '/home',
    element: <Home />,
  },
  {
    path: '/policy-details/:termId',
    element: <PolicyDetails />,
  },
]);
export default router;
