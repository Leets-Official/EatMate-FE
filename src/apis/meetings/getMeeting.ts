import defaultInstance from '@/apis/axiosInstance';
import { OfflineMeetingFormData } from './createMeeting';

interface MeetingQueryParams {
  deliveryCategory?: string;
  cover: string;
  sortOption: string;
  genderOption: string;
  rangeLabel: string;
}

export interface MeetingData {
  meetingName: string;
  meetingType: string;
  meetingDescription: string;
  genderRestriction: string;
  location: string;
  dueDateTime: string;
  chatTime: string;
  isOwner: boolean;
  isCurrentUser: boolean;
  participants: Participant[];
}

interface Participant {
  userId: number;
  name: string;
  isOwner: boolean;
  isCurrentUser: boolean;
}

export const getOfflineMeetingApi = () => {
  const fetchMeetings = async ({
    deliveryCategory,
    cover,
    sortOption,
    genderOption,
    rangeLabel,
  }: MeetingQueryParams) => {
    let category;
    if (cover === 'meal') {
      category = 'MEAL';
    } else if (cover === 'beer') {
      category = 'BEVERAGE';
    } else if (deliveryCategory) {
      // 배달 카테고리 선택 안 할 경우는 할당x
      category = deliveryCategory;
    }

    const endpoint = cover === 'delivery' ? 'delivery' : 'offline';
    const [minParticipants, maxParticipants] = rangeLabel
      .replace('인', '')
      .split('~')
      .map((value, index) => {
        const num = Number(value);
        return isNaN(num) ? (index === 1 ? 10 : 0) : num;
      });

    const sortType =
      sortOption === '기본순'
        ? 'PARTICIPANT_COUNT'
        : sortOption === '최신등록순'
          ? 'CREATED_AT'
          : 'MEETING_TIME';

    const genderRestriction =
      genderOption === '모든성별'
        ? 'ALL'
        : genderOption === '남자만'
          ? 'MALE'
          : 'FEMALE';

    const params: any = {
      'page-size': 5,
      'gender-restriction': genderRestriction,
      'max-participant': maxParticipants,
      'min-participant': minParticipants,
      'sort-type': sortType,
    };

    // 카테고리가 null일 경우는 params에 추가하지 않음음
    if (category) {
      params.category = category;
    }

    const response = await defaultInstance.get(`/api/meetings/${endpoint}`, {
      params,
    });
    return response.data.result.content;
  };

  return { fetchMeetings };
};

export const getMeetingDetailApi = async (meetingId: string) => {
  const response = await defaultInstance.get(`/api/meetings/${meetingId}`);
  return response.data.result;
};

export const patchOfflineMeetingApi = async (
  meetingId: string,
  updatedData: OfflineMeetingFormData
) => {
  const response = await defaultInstance.put(
    `/api/meetings/${meetingId}/offline`,
    updatedData
  );
  return response.data.result;
};
