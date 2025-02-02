import defaultInstance from '@/apis/axiosInstance';

const PATH = '/api/notices';

export interface getNoticeParams {
  pageNumber: number;
  pageSize: number;
}

export const getNoticeApi = async (params: getNoticeParams) => {
  const response = await defaultInstance.get(PATH, { params });
  return response.data.result;
};
