import defaultInstance from '@/apis/axiosInstance';

const PATH = '/api/meetings';

export interface OfflineMeetingFormData {
  meetingName: string;
  meetingDescription: string;
  genderRestriction?: string;
  isLimited?: boolean;
  maxParticipants?: number | null;
  meetingPlace: string;
  meetingDate: string;
  offlineMeetingCategory: string; // 밥약인지 술약인지
  backgroundImage?: File | null;
  backgroundImageType: string;
}

export interface DeliveryMeetingFormData {
  meetingName: string;
  meetingDescription: string;
  genderRestriction: string;
  isLimited: boolean;
  maxParticipants: number | null;
  foodCategory: string;
  storeName: string;
  pickupLocation: string;
  orderDeadline: number;
  accountNumber: string;
  bankName: string;
  backgroundImage?: File | null;
  backgroundImageType: string;
}

export const createFormData = (
  data: OfflineMeetingFormData | DeliveryMeetingFormData
): FormData => {
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

// API 호출 함수
export const postFormData = async (url: string, formData: FormData) => {
  return defaultInstance.post(url, formData).then((response) => response.data);
};

// 오프라인 모임 생성 API 호출
export const createOfflineMeeting = async (
  offlineCreateData: OfflineMeetingFormData
) => {
  const formData = createFormData(offlineCreateData);
  return await postFormData(`${PATH}/offline`, formData);
};

// 배달팟 모임 생성 API 호출
export const createDeliveryMeeting = async (
  DeliveryCreateData: DeliveryMeetingFormData
) => {
  const formData = createFormData(DeliveryCreateData);
  return await postFormData(`${PATH}/delivery`, formData);
};

export const patchDeliveryMeetingApi = async (
  meetingId: string,
  updatedData: DeliveryMeetingFormData
) => {
  const formData = createFormData(updatedData);
  const response = await defaultInstance.put(
    `/api/meetings/${meetingId}/delivery`,
    formData
  );
  return response.data.result;
};

export const patchOfflineMeetingApi = async (
  meetingId: string,
  updatedData: OfflineMeetingFormData
) => {
  const formData = createFormData(updatedData);

  const response = await defaultInstance.put(
    `/api/meetings/${meetingId}/offline`,
    formData
  );
  return response.data.result;
};
