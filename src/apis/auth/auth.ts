import defaultInstance from '@/apis/axiosInstance';

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
    const response = await defaultInstance.post('/api/auth/signup', signupData);
    return response.data;
  } catch (error) {
    console.error('회원가입 요청 중 오류가 발생했습니다.', error);
    throw error;
  }
};
