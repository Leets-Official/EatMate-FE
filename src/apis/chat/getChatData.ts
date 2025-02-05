import defaultInstance from '../axiosInstance';

export interface GetMyMeetingParams {
  page?: number;
  size?: number;
  sort?: string[];
}

export const getChatApi = async (
  chatRoomId: number,
  params: GetMyMeetingParams = { page: 0, size: 20, sort: ['createdAt,DESC'] }
) => {
  const response = await defaultInstance.get(`/api/chat-rooms/${chatRoomId}`, {
    params,
  });
  return response.data;
};
