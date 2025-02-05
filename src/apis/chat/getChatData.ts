import defaultInstance from '../axiosInstance';

export interface Chat {
  chatId: number;
  senderId: number;
  chatRoomId: number;
  content: string;
  regDate: string;
}

export interface Participant {
  memberId: number;
  nickname: string;
  mbti: string;
  profileImageUrl: string;
  role: string;
  isMine: boolean;
}

export interface DeliveryNotice {
  store: string;
  account: string;
  bank: string;
  pickup: string;
}

export interface ChatRoomDetails {
  chats: Chat[];
  participants: Participant[];
  deliveryNotice: DeliveryNotice;
  meetingName: string;
  offlineNotice: any; // 적절한 타입 지정이 필요할 수 있습니다.
  pageNumber: number;
  isLast: boolean;
}

export interface ApiResponse {
  code: number;
  timestamp: string;
  message: string;
  result: ChatRoomDetails;
  success: boolean;
}

// export interface GetMyMeetingParams {
//   page?: number;
//   size?: number;
//   sort?: string[];
// }

// API 호출 함수
export const getChatApi = async (chatRoomId: number) => {
  const response = await defaultInstance.get(`/api/chat-rooms/${chatRoomId}`, {
    params: {
      page: 0,
      size: 20,
      sort: 'createdAt,DESC',
    },
  });
  console.log(response);
  return response.data;
};
