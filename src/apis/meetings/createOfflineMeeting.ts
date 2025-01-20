import defaultInstance from '@/apis/axiosInstance';

const PATH = '/api/meetings';

interface CreateMeetingRequest {
  meetingName: string;
  meetingDescription: string;
  // "genderRestriction": "MALE",
  isLimited: boolean;
  maxParticipants: number | null;
  meetingPlace: string;
  meetingDate: string;
  // "offlineMeetingCategory": string;         // 밥약인지 술약인지
}

export const createOfflineMeeting = async (
  OfflineCreateData: CreateMeetingRequest
) => {
  try {
    const response = await defaultInstance.post(PATH + '/offline', {
      ...OfflineCreateData,
      meetingDate: new Date(OfflineCreateData.meetingDate).toISOString(),
    });
    return response.data;
  } catch (error) {
    console.error('오프라인 모임 생성 실패:  ', error);
    throw error;
  }
};
