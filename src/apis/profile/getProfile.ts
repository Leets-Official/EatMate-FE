import defaultInstance from '@/apis/axiosInstance';

const PATH = '/api/profile';

export interface ProfileData {
  email: string;
  nickname: string;
  studentNumber: number | null;
  mbti: string | null;
  birthDate: {
    year: number | null;
    month: number | null;
    day: number | null;
  };
  gender: string;
  phoneNumber: string;
  profileImageUrl?: string;
}

export const getProfileInfo = async (): Promise<ProfileData> => {
  const response = await defaultInstance.get<{ result: ProfileData }>(
    PATH + '/myinfo'
  );
  return response.data.result;
};
