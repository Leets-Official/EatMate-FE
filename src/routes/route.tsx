import { createBrowserRouter, Navigate } from 'react-router-dom';
import Home from '@/pages/Home';
import Intro from '@/pages/signup/Intro';
import PolicyDetails from '@/pages/signup/PolicyDetails';
import BirthdayGenderStep from '@/components/SignUp/BirthdayGenderStep';
import PhoneNumStep from '@/components/SignUp/PhoneNumStep';
import MbtiStep from '@/components/SignUp/MbtiStep';
import NicknameStep from '@/components/SignUp/NicknameStep';
import StudentIdStep from '@/components/SignUp/StudentIdStep';
import ProfileImgStep from '@/components/SignUp/ProfileImgStep';
import SignupLayout from '@/pages/signup/SignUpLayout';
import LoginCallback from '@/pages/signup/LoginCallback';
import OfflineEventCreate from '@/pages/event/OfflineEventCreate';
import DeliveryEventCreate from '@/pages/event/DeliveryEventCreate';

const router = createBrowserRouter([
  {
    path: '',
    element: <Intro />,
  },
  {
    path: '/oauth2/callback',
    element: <LoginCallback />,
  },
  {
    path: '/signup',
    element: <SignupLayout />,
    children: [
      { index: true, element: <Navigate to="/signup/birthday-gender" /> },
      { path: 'birthday-gender', element: <BirthdayGenderStep /> },
      { path: 'phone-number', element: <PhoneNumStep /> },
      { path: 'mbti', element: <MbtiStep /> },
      { path: 'nickname', element: <NicknameStep /> },
      { path: 'student-id', element: <StudentIdStep /> },
      { path: 'profile-img', element: <ProfileImgStep /> },
    ],
  },
  {
    path: '/home',
    element: <Home />,
  },
  {
    path: '/events/create/offline',
    element: <OfflineEventCreate />,
  },
  {
    path: '/events/create/delivery',
    element: <DeliveryEventCreate />,
  },
  {
    path: '/policy-details/:termId',
    element: <PolicyDetails />,
  },
]);
export default router;
