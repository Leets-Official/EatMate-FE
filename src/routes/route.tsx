import { createBrowserRouter } from 'react-router-dom';
import Home from '@/pages/Home';
import SignUp from '@/pages/SignUpPage/SignUp';
import IntroPage from '@/pages/SignUpPage/IntroPage';
import PolicyDetails from '@/pages/SignUpPage/PolicyDetails';

const router = createBrowserRouter([
  {
    path: '',
    element: <IntroPage />,
  },
  {
    path: '/signup',
    element: <SignUp />,
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
