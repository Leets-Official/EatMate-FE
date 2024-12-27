import { createBrowserRouter } from 'react-router-dom';
import Home from '../page/Home';
import Login from '../page/Login';

const router = createBrowserRouter([
  {
    path: '',
    element: <Login />,
  },
  {
    path: '/home',
    element: <Home />,
  },
]);
export default router;
