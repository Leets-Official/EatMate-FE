import defaultInstance from '@/apis/axiosInstance';

const PATH = '/api/reports';

export const getReportApi = async () => {
  const response = await defaultInstance.get(`${PATH}/all`);
  return response.data.result;
};
