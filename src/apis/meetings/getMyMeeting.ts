import defaultInstance from '@/apis/axiosInstance';

const PATH = '/api/meetings/my';

interface getMyMeetingParams {
  lastMeetingId?: number;
  lastDateTime?: string;
  pageSize: number;
}

export const getMyCreatedApi = async (params: getMyMeetingParams) => {
  const response = await defaultInstance.get(`${PATH}/created`, { params });
  return response.data.result;
};

export const getMyParticipatedApi = async (params: getMyMeetingParams) => {
  const response = await defaultInstance.get(`${PATH}/participated`, {
    params,
  });
  return response.data.result;
};
