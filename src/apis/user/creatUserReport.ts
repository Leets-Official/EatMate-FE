import defaultInstance from '@/apis/axiosInstance';

export const postUserBlock = async (memberId: string) => {
  const response = await defaultInstance.post('/api/block/member', {
    memberId,
  });
  return response.data.result;
};
