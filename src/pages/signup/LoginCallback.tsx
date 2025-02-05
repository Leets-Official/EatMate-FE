import { getUserInfo } from '@/apis/auth/auth';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Loading from '@/components/common/Loading';

const LoginCallback: React.FC = () => {
  const nav = useNavigate();

  useEffect(() => {
    const handleLoginResponse = async () => {
      try {
        // 로딩중 2초
        await new Promise((resolve) => setTimeout(resolve, 2000));
        const response = await getUserInfo();

        if (!response) {
          console.error('유저 정보를 가져올 수 없습니다.');
          nav('/intro');
          return;
        }
        console.log('사용자 인증정보 : ', response);
        const { role } = response;

        // Role에 따라 페이지 이동
        switch (role) {
          case 'USER':
            nav('/home');
            break;
          case 'GUEST':
            nav('/signup');
            break;
          default:
            console.error('알 수 없는 사용자 role: ', role);
            nav('/intro');
        }
      } catch (error) {
        // interceptor가 처리한 에러메세지 가져오기
        if (error instanceof Error) {
          console.error(`로그인 처리 중 오류가 발생했습니다: ${error.message}`);
        } else {
          console.error('로그인 중 알 수 없는 오류가 발생했습니다.');
        }
        console.error('로그인 처리 중 오류가 발생했습니다.', error);
        nav('/intro');
      }
    };

    handleLoginResponse();
  }, [nav]);

  return <Loading />;
};

export default LoginCallback;
