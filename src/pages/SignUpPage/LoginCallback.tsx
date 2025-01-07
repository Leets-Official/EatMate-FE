import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

interface TokenPayload {
  email: string;
  role: string;
  exp: number;
}

const LoginCallback: React.FC = () => {
  const [_, setCookie] = useCookies(['accessToken', 'refreshToken']);
  const nav = useNavigate();

  useEffect(() => {
    const handleLoginResponse = async () => {
      try {
        const res = await axios.get(window.location.href, {
          withCredentials: true,
        });

        const accessToken = res.headers['authorization']?.replace(
          'Bearer ',
          ''
        );
        const refreshToken = res.headers['authorization-refresh']?.replace(
          'Bearer ',
          ''
        );

        if (!accessToken) {
          console.error('Access Token이 없습니다.');
          nav('/intro');
          return;
        }

        const decoded = jwtDecode<TokenPayload>(accessToken);
        console.log('디코딩된 JWT : ', decoded);

        setCookie('accessToken', accessToken, { path: '/', maxAge: 15 * 60 });
        if (refreshToken) {
          setCookie('refreshToken', refreshToken, {
            path: '/',
            maxAge: 7 * 24 * 60 * 60,
          });
        }

        if (decoded.role === 'USER') {
          nav('/home');
        } else if (decoded.role === 'GUEST') {
          nav('/signup');
        } else {
          console.error('알수 없는 사용자 role: ', decoded.role);
          nav('/intro');
        }
      } catch (error) {
        console.error('로그인 처리 중 오류가 발생했습니다. ', error);
      }
    };

    handleLoginResponse();
  }, [setCookie, nav]);

  return <div>로그인 처리 중 ...</div>;
};

export default LoginCallback;
