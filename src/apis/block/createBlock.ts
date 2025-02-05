import defaultInstance from '@/apis/axiosInstance';

const PATH = '/api/block/member';

export const createBlockApi = async (memberId: string) => {
  const response = await defaultInstance.post(
    PATH,
    {
      memberId: memberId,
    },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  return response.data.result;
};
