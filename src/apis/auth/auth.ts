import defaultInstance from '@/apis/axiosInstance';

const PATH = '/api/auth';

interface UserInfo {
  email: string;
  role: string;
  gender: 'MALE' | 'FEMALE';
}

export const getUserInfo = async (): Promise<UserInfo | null> => {
  const response = await defaultInstance.get<{ result: UserInfo }>(
    PATH + '/info'
  );
  return response.data.result;
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
  const formattedSignupData = {
    ...signupData,
    phoneNumber: signupData.phoneNumber.replace(/-/g, ''),
  };

  const response = await defaultInstance.post(
    PATH + '/signup',
    formattedSignupData
  );
  return response.data;
};
