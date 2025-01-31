import defaultInstance from '../axiosInstance';

const PATH = 'api/profile';

export interface patchProfileData {
  nickname?: string;
  mbti?: string;
  profileImage: File | null;
}

export const patchProfileInfo = async (
  updatedData: patchProfileData
): Promise<patchProfileData> => {
  const formData = new FormData();

  if (updatedData.nickname) {
    formData.append('nickname', updatedData.nickname);
  }
  if (updatedData.mbti) {
    formData.append('mbti', updatedData.mbti);
  }
  if (updatedData.profileImage) {
    formData.append('profileImage', updatedData.profileImage);
  }
  const response = await defaultInstance.patch<{ result: patchProfileData }>(
    `${PATH}/myinfo`,
    formData
  );
  return response.data.result;
};
