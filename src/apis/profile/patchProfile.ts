import defaultInstance from '../axiosInstance';

const PATH = '/api/profile';

export interface patchProfileData {
  nickname?: string;
  mbti?: string;
  profileImage?: File | null;
}

export const patchProfileInfo = async (
  updatedData: patchProfileData
): Promise<patchProfileData> => {
  const formData = new FormData();

  // nickname, mbti가 있는 경우 JSON Blob으로 추가
  if (updatedData.nickname || updatedData.mbti) {
    const dataToSend = JSON.stringify({
      nickname: updatedData.nickname || undefined,
      mbti: updatedData.mbti || undefined,
    });

    formData.append(
      'data',
      new Blob([dataToSend], { type: 'application/json' })
    );
  }

  // profileImage가 있으면 추가
  if (updatedData.profileImage) {
    formData.append('profileImage', updatedData.profileImage);
  }

  const response = await defaultInstance.patch<{ result: patchProfileData }>(
    `${PATH}/myinfo`,
    formData
  );

  return response.data.result;
};
