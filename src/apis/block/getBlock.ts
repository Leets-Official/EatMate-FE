import defaultInstance from '@/apis/axiosInstance';

const PATH = '/api/block/member';

export const getBlockApi = async () => {
  const response = await defaultInstance.get(PATH);
  return response.data.result;
};

export const deleteBlockApi = async ({ memberId }: { memberId: number }) => {
  const response = await defaultInstance.delete(PATH, { data: { memberId } });
  return response.data;
};
