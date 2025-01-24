import defaultInstance from '@/apis/axiosInstance';

const PATH = '/api/meetings';

export interface OfflineMeetingFormData {
  meetingName: string;
  meetingDescription: string;
  genderRestriction: string;
  isLimited: boolean;
  maxParticipants: number | null;
  meetingPlace: string;
  meetingDate: string;
  offlineMeetingCategory: string; // 밥약인지 술약인지
  backgroundImage: File | null;
}

const createFormData = (data: OfflineMeetingFormData): FormData => {
  const formData = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    if (value !== null && value !== undefined) {
      if (key === 'backgroundImage' && value instanceof File) {
        formData.append(key, value);
      } else if (typeof value === 'boolean' || typeof value === 'number') {
        formData.append(key, String(value));
      } else {
        formData.append(key, value as string);
      }
    }
  });

  return formData;
};

const postFormData = async (url: string, formData: FormData) => {
  try {
    const response = await defaultInstance.post(url, formData);
    return response.data;
  } catch (error) {
    throw new Error(
      `API 요청 실패: ${error instanceof Error ? error.message : error}`
    );
  }
};

export const createOfflineMeeting = async (
  offlineCreateData: OfflineMeetingFormData
) => {
  try {
    const formData = createFormData(offlineCreateData);
    return await postFormData(`${PATH}/offline`, formData);
  } catch (error) {
    console.error(
      `오프라인 모임 생성 실패: ${error instanceof Error ? error.message : error}`
    );
    throw error;
  }
};
