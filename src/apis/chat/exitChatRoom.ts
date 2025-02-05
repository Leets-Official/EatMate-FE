import defaultInstance from '@/apis/axiosInstance';

export const exitChatRoom = async (chatRoomId: number) => {
  const response = await defaultInstance.patch(`/api/chat-rooms/${chatRoomId}`);
  return response.data.result;
};
