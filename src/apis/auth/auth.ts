import defaultInstance from '@/apis/axiosInstance';

interface UserInfo {
  email: string;
  role: string;
  gender: 'MALE' | 'FEMALE';
}

export const getUserInfo = async (): Promise<UserInfo | null> => {
  try {
    const response = await defaultInstance.get<{ result: UserInfo }>(
      '/api/auth/info'
    );
    return response.data.result;
  } catch (error) {
    console.error('유저 정보 불러오기 실패: ', error);
    return null;
  }
};

export const signupUser = async (signupData: {
  year: number | null;
  month: number | null;
  day: number | null;
  gender: string;
  phoneNumber: string;
  mbti: string;
  studentNumber: number | null;
  nickname: string;
}) => {
  try {
    const formattedSignupData = {
      ...signupData,
      phoneNumber: signupData.phoneNumber.replace(/-/g, ''),
    };

    const response = await defaultInstance.post(
      '/api/auth/signup',
      formattedSignupData
    );
    return response.data;
  } catch (error) {
    console.error('회원가입 요청 중 오류가 발생했습니다.', error);
    throw error;
  }
};
