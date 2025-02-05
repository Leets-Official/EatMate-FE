import defaultInstance from '@/apis/axiosInstance';

const PATH = '/api/profile';

export interface ProfileData {
  email: string | null;
  nickname: string | null;
  studentNumber: number;
  mbti: string | null;
  birthDate: {
    year: number | null;
    month: number | null;
    day: number | null;
  };
  gender: string;
  phoneNumber: string;
  profileImageUrl: string | null;
}

export const getProfileInfo = async (): Promise<ProfileData> => {
  const response = await defaultInstance.get<{ result: ProfileData }>(
    PATH + '/myinfo'
  );
  return response.data.result;
};

export const getUserProfileInfo = async (
  memberId: number
): Promise<ProfileData> => {
  const response = await defaultInstance.get<{ result: ProfileData }>(
    PATH + `/info/${memberId}`
  );
  return response.data.result;
};
