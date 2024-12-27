import { createBrowserRouter } from 'react-router-dom';
import Home from '../pages/Home';
import SignUp from '../pages/SignUpPage/SignUp';
import Intro from '../pages/SignUpPage/Intro';

const router = createBrowserRouter([
  {
    path: '',
    element: <Intro />,
  },
  {
    path: '/signup',
    element: <SignUp />,
  },
  {
    path: '/home',
    element: <Home />,
  },
]);
export default router;
