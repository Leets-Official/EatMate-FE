import { createBrowserRouter, Navigate } from 'react-router-dom';
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
import MeetingDetail from '@/pages/MeetingDetail';

const router = createBrowserRouter([
  {
    path: '',
    element: <Intro />,
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
    path: '/policy-details/:termId',
    element: <PolicyDetails />,
  },
  {
    path: '/meeting', //나중에 뒤에 모임 Id 추가로 넣을 예정
    element: <MeetingDetail />,
  },
]);
export default router;
