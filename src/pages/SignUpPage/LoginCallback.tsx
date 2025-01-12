import defaultInstance from '@/apis/axiosInstance';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginCallback: React.FC = () => {
  const nav = useNavigate();

  useEffect(() => {
    const handleLoginResponse = async () => {
      try {
        const response = await defaultInstance.get('/api/auth/info');
        console.log('API 응답: ', response.data);
        const { role } = response.data.result;

        // Role에 따라 페이지 이동
        if (role === 'USER') {
          nav('/home');
        } else if (role === 'GUEST') {
          nav('/signup');
        } else {
          console.error('알 수 없는 사용자 role: ', role);
          nav('/intro');
        }
      } catch (error) {
        console.error('로그인 처리 중 오류가 발생했습니다.', error);
      }
    };

    handleLoginResponse();
  }, [nav]);

  return <div>로그인 처리 중...</div>;
};

export default LoginCallback;
