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

export const createOfflineMeeting = async (
  OfflineCreateData: OfflineMeetingFormData
) => {
  try {
    const OfflineFormData = new FormData();

    OfflineFormData.append('meetingName', OfflineCreateData.meetingName);
    OfflineFormData.append(
      'meetingDescription',
      OfflineCreateData.meetingDescription
    );
    OfflineFormData.append(
      'genderRestriction',
      OfflineCreateData.genderRestriction
    );
    OfflineFormData.append('isLimited', String(OfflineCreateData.isLimited));

    OfflineFormData.append('meetingDate', OfflineCreateData.meetingDate);

    if (
      OfflineCreateData.maxParticipants !== null &&
      OfflineCreateData.maxParticipants !== undefined
    ) {
      OfflineFormData.append(
        'maxParticipants',
        OfflineCreateData.maxParticipants.toString()
      );
    }

    OfflineFormData.append('meetingPlace', OfflineCreateData.meetingPlace);
    OfflineFormData.append(
      'offlineMeetingCategory',
      OfflineCreateData.offlineMeetingCategory
    );

    if (OfflineCreateData.backgroundImage instanceof File) {
      OfflineFormData.append(
        'backgroundImage',
        OfflineCreateData.backgroundImage
      );
    }

    const response = await defaultInstance.post(
      PATH + '/offline',
      OfflineFormData
    );
    return response.data;
  } catch (error) {
    console.error('오프라인 모임 생성 실패: ', error);
    throw error;
  }
};
