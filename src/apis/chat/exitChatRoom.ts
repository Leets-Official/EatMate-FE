import defaultInstance from '@/apis/axiosInstance';

export const exitChatRoom = async (chatRoomId: number) => {
  const response = await defaultInstance.patch(`/api/chat-rooms/${chatRoomId}`);
  console.log(response);
  return response;
};
