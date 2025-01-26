import { getUserInfo } from '@/apis/auth/auth';
import { useEffect, useState } from 'react';

export const useUserGender = () => {
  const [userGender, setUserGender] = useState<string | null>(null);

  useEffect(() => {
    const fetchGender = async () => {
      try {
        const userInfo = await getUserInfo();
        if (userInfo && userInfo.gender) {
          setUserGender(userInfo.gender);
        } else {
          setUserGender('MALE'); // 기본값 설정
        }
      } catch (error) {
        console.error('사용자 성별 가져오기 실패', error);
        setUserGender('MALE');
      }
    };
    fetchGender();
  }, []);

  return userGender;
};
