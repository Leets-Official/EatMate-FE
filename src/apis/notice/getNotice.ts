import defaultInstance from '@/apis/axiosInstance';

const PATH = '/api/notices';

export interface getNoticeParams {
  pageNumber: number;
  pageSize: number;
}

export interface getSingleNoticeIdParams {
  noticeId: number;
}

export const getNoticeApi = async (params: getNoticeParams) => {
  const response = await defaultInstance.get(PATH, { params });
  return response.data.result;
};

export const getSingleNoticeApi = async (params: getSingleNoticeIdParams) => {
  const response = await defaultInstance.get(PATH, { params });
  return response.data.result;
};
