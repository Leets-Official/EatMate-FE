import defaultInstance from '@/apis/axiosInstance';

export const enterOfflineChatRoom = async (meetingId: number) => {
  const response = await defaultInstance.patch(
    `/api/meetings/${meetingId}/offline`
  );
  return response.data;
};

export const enterDeliveryChatRoom = async (meetingId: number) => {
  const response = await defaultInstance.patch(
    `/api/meetings/${meetingId}/delivery`
  );
  return response.data;
};
