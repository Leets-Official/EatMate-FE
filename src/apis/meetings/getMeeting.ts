import defaultInstance from '@/apis/axiosInstance';

interface MeetingQueryParams {
  cover: string;
  sortOption: string;
  genderOption: string;
  rangeLabel: string;
}

export const getOfflineMeetingApi = () => {
  const fetchMeetings = async ({
    cover,
    sortOption,
    genderOption,
    rangeLabel,
  }: MeetingQueryParams) => {
    const category = cover === 'meal' ? 'MEAL' : 'BEVERAGE';
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

    const response = await defaultInstance.get(`/api/meetings/offline`, {
      params: {
        category,
        'page-size': 5,
        'gender-restriction': genderRestriction,
        'max-participant': maxParticipants,
        'min-participant': minParticipants,
        'sort-type': sortType,
      },
    });
    return response.data.result.content;
  };

  return { fetchMeetings };
};

interface DeliveryMeetingQueryParams {
  category: string;
  pageSize?: number;
  genderRestriction?: string;
  maxParticipant?: number;
  minParticipant?: number;
  sortType?: string;
}

export const getDeliveryMeetingApi = () => {
  const fetchMeetings = async ({
    category,
    pageSize = 20,
    genderRestriction = 'ALL',
    maxParticipant,
    minParticipant,
    sortType = 'PARTICIPANT_COUNT',
  }: DeliveryMeetingQueryParams) => {
    const response = await defaultInstance.get(`/api/meetings/delivery`, {
      params: {
        category,
        'page-size': pageSize,
        'gender-restriction': genderRestriction,
        'max-participant': maxParticipant,
        'min-participant': minParticipant,
        'sort-type': sortType,
      },
    });
    return response.data.result.content;
  };

  return { fetchMeetings };
};
