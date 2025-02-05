import React, { useEffect, useState } from 'react';
import Header from '@/components/common/Header/Header';
import ProfileIcon from '@/assets/images/ic_participant1.svg';
import Notice from '@/components/chat/Notice';
import ChatModal from '@/components/common/Modal/ChatModal';
import ChatExitModal from '@/components/common/Modal/ChatExitModal';
import useWebSocket from '@/hooks/useWebSocket';
import { formatTime, formatTimeWithMeridiem } from '@/utils/dateUtils';
import { ChatRoomDetails, getChatApi } from '@/apis/chat/getChatData';
import Loading from '@/components/common/Loading';
import { getUserProfileInfo, MemberData } from '@/apis/profile/getProfile';
import * as S from '@/styles/chat/ChatRoom.styled';

interface ChatMessage {
  senderId: number;
  content: string;
  chatRoomId: number;
  regDate: string;
}

const ChatRoom = () => {
  const roomId = parseInt(localStorage.getItem('chatRoomId') || '0', 10);
  const myId = parseInt(localStorage.getItem('myId') || '0', 10);
  const { messages, sendMessage, disconnect } = useWebSocket(roomId);
  const [inputText, setInputText] = useState('');
  const [isChatModalOpen, setChatModalOpen] = useState(false);
  const [isChatExitModalOpen, setChatExitModalOpen] = useState(false);

  // 채팅방 날짜 설정
  const [today, setToday] = useState(new Date());

  useEffect(() => {
    const now = new Date();
    const nextMidnight = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() + 1
    );
    const msUntilMidnight = nextMidnight.getTime() - now.getTime();

    const timer = setTimeout(() => {
      setToday(new Date());
    }, msUntilMidnight);

    return () => clearTimeout(timer);
  }, [today]);

  // 날짜를 "YYYY년 MM월 DD일 (D)" 형식으로 포맷
  const formatDate = (date: any) => {
    const days = ['일', '월', '화', '수', '목', '금', '토'];
    return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일 (${days[date.getDay()]})`;
  };

  // 상대 유저 정보 설정
  const [userProfiles, setUserProfiles] = useState<{
    [key: number]: MemberData;
  }>({});

  const fetchUserProfile = async (memberId: number) => {
    if (!userProfiles[memberId]) {
      // 캐싱된 정보가 없는 경우에만 API 호출
      try {
        const profileInfo = await getUserProfileInfo(memberId);
        setUserProfiles((prev) => ({ ...prev, [memberId]: profileInfo }));
      } catch (error) {
        console.error('Failed to fetch user profile:', error);
      }
    }
  };

  // 메시지 렌더링 시 사용자 정보 불러오기
  useEffect(() => {
    messages?.chattingMessage?.forEach((msg) => {
      if (msg.senderId && msg.content !== null) {
        fetchUserProfile(msg.senderId);
      }
    });
  }, [messages]);

  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);

  const openChatModal = () => setChatModalOpen(true);
  const closeChatModal = () => setChatModalOpen(false);

  const openChatExitModal = () => {
    closeChatModal();
    setChatExitModalOpen(true);
  };

  const closeChatExitModal = () => setChatExitModalOpen(false);

  const handleSendMessage = async () => {
    const now = new Date();
    // UTC에서 9시간을 더해 KST로 변환
    now.setHours(now.getHours() + 9);

    const message: ChatMessage = {
      senderId: myId,
      content: inputText,
      chatRoomId: roomId,
      regDate: now.toISOString(),
    };

    sendMessage(message);
    setInputText('');
  };

  console.log(new Date().toISOString());
  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(event.target.value);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSendMessage();
    }
  };

  const handleMenu = () => {
    openChatModal();
  };
  useEffect(() => {
    return () => {
      disconnect();
    };
  }, [disconnect]);

  const [chatRoomDetails, setChatRoomDetails] =
    useState<ChatRoomDetails | null>(null);

  useEffect(() => {
    const fetchChatRoomDetails = async () => {
      try {
        const result = await getChatApi(roomId);
        setChatMessages(result.result.chats);
        setChatRoomDetails(result.result);
      } catch (error) {
        console.error('Failed to fetch chat room details:', error);
      }
    };

    fetchChatRoomDetails();
  }, [roomId]);

  useEffect(() => {
    if (messages?.chattingMessage) {
      setChatMessages((prevMessages) => [
        ...prevMessages,
        ...messages.chattingMessage,
      ]);
    }
  }, [messages]);

  console.log(messages);

  if (!chatRoomDetails) return <Loading />;

  console.log('정보', getUserProfileInfo(myId));

  return (
    <S.ChatContainer>
      <Header
        title={chatRoomDetails.meetingName}
        showBackButton={true}
        isMenu={true}
        onMenuClick={handleMenu}
      />
      {chatRoomDetails.deliveryNotice === null ? (
        <Notice
          type="meeting"
          place={chatRoomDetails.offlineNotice.store}
          details={formatTimeWithMeridiem(chatRoomDetails.offlineNotice.time)}
        />
      ) : (
        <Notice
          type="delivery"
          place={chatRoomDetails.deliveryNotice.store}
          details={chatRoomDetails.deliveryNotice.bank}
          extraInfo={chatRoomDetails.deliveryNotice.pickup}
        />
      )}

      <S.DateContainer>{formatDate(today)}</S.DateContainer>
      <S.MessagesList>
        {messages?.chattingMessage
          ?.filter((msg) => msg.content !== null)
          .map((msg, index) => {
            const userProfile = userProfiles[msg.senderId];
            return (
              <S.Message key={index} isMine={msg.senderId === myId}>
                <S.ProfileContainer isMine={msg.senderId === myId}>
                  <S.ProfileImg
                    src={userProfile?.profileImageUrl || ProfileIcon}
                    alt={userProfile?.nickname || 'User Image'}
                  />
                  <S.ProfileText>
                    {userProfile
                      ? `${userProfile.nickname} | ${userProfile.mbti}`
                      : 'Loading...'}
                  </S.ProfileText>
                </S.ProfileContainer>
                <S.MessageContent isMine={msg.senderId === myId}>
                  <S.TimeStamp isMine={msg.senderId === myId}>
                    {formatTime(msg.regDate)}
                  </S.TimeStamp>
                  <S.MessageBox isMine={msg.senderId === myId}>
                    {msg.content}
                  </S.MessageBox>
                </S.MessageContent>
              </S.Message>
            );
          })}
      </S.MessagesList>

      <S.InputContainer>
        <S.Input
          value={inputText}
          onChange={handleInput}
          onKeyPress={handleKeyPress}
          placeholder="메시지 입력"
        />
        <S.SendButton onClick={handleSendMessage} />
      </S.InputContainer>
      {isChatModalOpen && (
        <ChatModal
          title={chatRoomDetails.meetingName}
          participants={chatRoomDetails.participants}
          onExit={openChatExitModal}
          onClose={() => setChatModalOpen(false)}
        />
      )}
      {isChatExitModalOpen && (
        <ChatExitModal roomId={roomId} onClose={closeChatExitModal} />
      )}
    </S.ChatContainer>
  );
};

export default ChatRoom;
