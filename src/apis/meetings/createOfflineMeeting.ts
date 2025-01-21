import defaultInstance from '@/apis/axiosInstance';

const PATH = '/api/meetings';

export interface CreateMeetingRequest {
  meetingName: string;
  meetingDescription: string;
  genderRestriction: string;
  isLimited: boolean;
  maxParticipants: number | null;
  meetingPlace: string;
  meetingDate: string;
  offlineMeetingCategory: string; // 밥약인지 술약인지
  // backgroundImage: string;
}

export const createOfflineMeeting = async (
  OfflineCreateData: CreateMeetingRequest
) => {
  try {
    const response = await defaultInstance.post(
      PATH + '/offline',
      OfflineCreateData
    );
    return response.data;
  } catch (error) {
    console.error('오프라인 모임 생성 실패:  ', error);
    throw error;
  }
};
