import React, { useEffect, useState } from 'react';
import Header from '@/components/common/Header/Header';
import ProfileIcon from '@/assets/images/ic_participant1.svg';
import sendIcon from '@/assets/images/ic_send.svg';
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
  // const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);

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
        //setChatMessages(result.result.chats);
        setChatRoomDetails(result.result);
      } catch (error) {
        console.error('Failed to fetch chat room details:', error);
      }
    };

    fetchChatRoomDetails();
  }, [roomId]);

  // useEffect(() => {
  //   if (messages?.chattingMessage) {
  //     setChatMessages((prevMessages) => [
  //       ...prevMessages,
  //       ...messages.chattingMessage,
  //     ]);
  //   }
  // }, [messages]);

  console.log('채팅', chatRoomDetails?.participants);

  if (!chatRoomDetails) return <Loading />;

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
            // 참여자 목록에서 메시지 발신자의 프로필을 찾음
            const userProfile = chatRoomDetails?.participants.find(
              (participant) => participant.memberId === msg.senderId
            );

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
                      : 'Loading'}
                  </S.ProfileText>
                </S.ProfileContainer>
                <S.MessageContent isMine={msg.senderId === myId}>
                  {msg.senderId === myId && (
                    <S.TimeStamp isMine={msg.senderId === myId}>
                      {formatTime(msg.regDate)}
                    </S.TimeStamp>
                  )}
                  <S.MessageBox isMine={msg.senderId === myId}>
                    {msg.content}
                  </S.MessageBox>
                  {msg.senderId !== myId && (
                    <S.TimeStamp isMine={msg.senderId === myId}>
                      {formatTime(msg.regDate)}
                    </S.TimeStamp>
                  )}
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
        <S.SendButton
          src={sendIcon}
          alt="전송 버튼"
          onClick={handleSendMessage}
        />
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
