import { createBrowserRouter, Navigate } from 'react-router-dom';
import Home from '@/pages/Home';
import Intro from '@/pages/signup/Intro';
import PolicyDetails from '@/pages/signup/PolicyDetails';
import PhoneNumStep from '@/components/SignUp/PhoneNumStep';
import MbtiStep from '@/components/SignUp/MbtiStep';
import NicknameStep from '@/components/SignUp/NicknameStep';
import StudentIdStep from '@/components/SignUp/StudentIdStep';
import ProfileImgStep from '@/components/SignUp/ProfileImgStep';
import SignupLayout from '@/pages/signup/SignUpLayout';
import LoginCallback from '@/pages/signup/LoginCallback';
import OfflineMeetingCreate from '@/pages/event/OfflineMeetingCreate';
import DeliveryMeetingCreate from '@/pages/event/DeliveryMeetingCreate';
import MyPage from '@/pages/mypage/MyPage';
import MyCreatedMeetings from '@/pages/mypage/MyCreatedMeetings';
import MyParticipatedMeetings from '@/pages/mypage/MyParticipatedMeetings';
import ReportedUser from '@/pages/mypage/ReportedUser';
import BlockedUser from '@/pages/mypage/BlockedUser';
import Notice from '@/pages/mypage/Notice';
import UserInfoEdit from '@/pages/mypage/UserInfoEdit';
import Faq from '@/pages/mypage/Faq';
import BirthdayStep from '@/components/SignUp/BirthdayStep';
import GenderStep from '@/components/SignUp/GenderStep';
import SignupSuccess from '@/pages/signup/SignupSuccess';
import Splash from '@/pages/Splash';
import NotFound from '@/pages/Not-found';
import AuthGuard from '@/components/common/AuthGuard';
import ChatRoom from '@/pages/chat/ChatRoom';
import MeetingDetail from '@/pages/MeetingDetail';
import UserProfile from '@/pages/chat/UserProfile';
import UserReport from '@/pages/chat/UserReport';
import UserReportPost from '@/pages/chat/UserReportPost';
import TestChat from '@/pages/chatPage';

const router = createBrowserRouter([
  {
    path: '',
    element: <Splash />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
  {
    path: '/intro',
    element: <Intro />,
  },
  {
    path: '/intro/oauth2/callback',
    element: <LoginCallback />,
  },
  {
    path: '/signup',
    element: (
      <AuthGuard>
        <SignupLayout />
      </AuthGuard>
    ),
    children: [
      { index: true, element: <Navigate to="/signup/profile-img" /> },
      { path: 'profile-img', element: <ProfileImgStep /> },
      { path: 'phone-number', element: <PhoneNumStep /> },
      { path: 'nickname', element: <NicknameStep /> },
      { path: 'birthday', element: <BirthdayStep /> },
      { path: 'gender', element: <GenderStep /> },
      { path: 'student-id', element: <StudentIdStep /> },
      { path: 'mbti', element: <MbtiStep /> },
    ],
  },
  {
    path: '/signup/success',
    element: <SignupSuccess />,
  },
  {
    path: '/home',
    element: <Home />,
  },
  {
    path: '/meeting/create/offline',
    element: <OfflineMeetingCreate />,
  },
  {
    path: '/meeting/create/delivery',
    element: <DeliveryMeetingCreate />,
  },
  {
    path: '/policy-details/:termId',
    element: <PolicyDetails />,
  },

  {
    path: '/chatting',
    element: <ChatRoom />,
  },
  {
    path: '/profile',
    element: <UserProfile />,
  },
  {
    path: '/report',
    element: <UserReport />,
  },
  {
    path: '/report/post',
    element: <UserReportPost />,
  },
  {
    path: '/meeting/:meetingId',
    element: <MeetingDetail />,
  },
  { path: '/mypage', element: <MyPage /> },
  { path: '/mypage/profile', element: <UserInfoEdit /> },
  { path: '/mypage/created-meetings', element: <MyCreatedMeetings /> },
  {
    path: '/mypage/participated-meetings',
    element: <MyParticipatedMeetings />,
  },
  { path: '/mypage/notice', element: <Notice /> },
  { path: '/mypage/reported-users', element: <ReportedUser /> },
  { path: '/mypage/blocked-users', element: <BlockedUser /> },
  { path: '/mypage/help', element: <Faq /> },
  { path: '/test', element: <TestChat /> },
]);
export default router;
