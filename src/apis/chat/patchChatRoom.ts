import defaultInstance from '@/apis/axiosInstance';

export const patchChatRoom = async (chatRoomId: string) => {
  const response = await defaultInstance.get(`/api/chat-rooms/${chatRoomId}`);
  return response.data.result;
};
