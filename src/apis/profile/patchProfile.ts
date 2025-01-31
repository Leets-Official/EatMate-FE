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

  // 닉네임과 MBTI가 있는 경우만 추가 (수정된 필드만 포함)
  if (updatedData.nickname || updatedData.mbti) {
    const dataToSend = JSON.stringify({
      ...(updatedData.nickname && { nickname: updatedData.nickname }),
      ...(updatedData.mbti && { mbti: updatedData.mbti }),
    });

    formData.append(
      'data',
      new Blob([dataToSend], { type: 'application/json' })
    );
  }

  // 프로필 사진이 있을 경우 추가
  if (updatedData.profileImage !== undefined) {
    if (updatedData.profileImage === null) {
      formData.append('profileImage', ''); // 빈 문자열을 추가
    } else {
      formData.append('profileImage', updatedData.profileImage);
    }
  }

  const response = await defaultInstance.patch<{ result: patchProfileData }>(
    `${PATH}/myinfo`,
    formData
  );

  return response.data.result;
};
