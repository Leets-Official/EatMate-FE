import defaultInstance from '@/apis/axiosInstance';

interface MeetingQueryParams {
  deliveryCategory?: string;
  cover: string;
  sortOption: string;
  genderOption: string;
  rangeLabel: string;
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
    } else {
      category = deliveryCategory;
    }
    const endpoint = cover === 'delivery' ? 'delivery' : 'offline';
    console.log(endpoint);
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

    const response = await defaultInstance.get(`/api/meetings/${endpoint}`, {
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
