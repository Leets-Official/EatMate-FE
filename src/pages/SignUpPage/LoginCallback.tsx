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
  const [cookies] = useCookies(['accessToken', 'refreshToken']);
  const nav = useNavigate();

  useEffect(() => {
    const handleLoginResponse = async () => {
      try {
        const accessToken = cookies.accessToken;
        const refreshToken = cookies.refreshToken;

        if (!accessToken) {
          console.error('Access Token이 없습니다.');
          return;
        }

        // Access Token 디코딩
        const decoded = jwtDecode<TokenPayload>(accessToken);
        console.log('디코딩된 JWT : ', decoded);

        // // 토큰 로컬스토리지에 저장
        // localStorage.setItem('accessToken', accessToken);
        // if (refreshToken) {
        //   localStorage.setItem('refreshToken', refreshToken);
        // }

        // Role에 따라 페이지 이동
        if (decoded.role === 'USER') {
          nav('/home');
        } else if (decoded.role === 'GUEST') {
          nav('/signup');
        } else {
          console.error('알 수 없는 사용자 role: ', decoded.role);
          nav('/intro');
        }
      } catch (error) {
        console.error('로그인 처리 중 오류가 발생했습니다.', error);
      }
    };

    handleLoginResponse();
  }, [cookies, nav]);

  return <div>로그인 처리 중...</div>;
};

export default LoginCallback;
