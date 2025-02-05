import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import sendIcon from '@/assets/images/ic_backImg_default1.svg';
import Header from '@/components/common/Header/Header';
import ProfileIcon from '@/assets/images/ic_participant1.svg';
import Notice from '@/components/chat/Notice';
import ChatModal from '@/components/common/Modal/ChatModal';
import ChatExitModal from '@/components/common/Modal/ChatExitModal';
import { flexColumn } from '@/styles/CommonStyle';
import useWebSocket from '@/hooks/useWebSocket';
import { formatTime, formatTimeWithMeridiem } from '@/utils/dateUtils';
import { ChatRoomDetails, getChatApi } from '@/apis/chat/getChatData';
import Loading from '@/components/common/Loading';
import { getUserProfileInfo, MemberData } from '@/apis/profile/getProfile';

const ChatContainer = styled.div`
  ${flexColumn}
  height: 100vh;
  justify-content: space-between;
`;

const MessagesList = styled.div`
  flex-grow: 1;
  overflow-y: auto;
  padding: 0 10px;
`;

const Message = styled.div<{ isMine: boolean }>`
  ${flexColumn}
  align-items: ${({ isMine }) => (isMine ? 'flex-end' : 'flex-start')};
  margin: 10px;
`;

const MessageBox = styled.div<{ isMine: boolean }>`
  max-width: 70%;
  padding: 10px;
  border-radius: ${({ isMine }) =>
    isMine ? '15px 0 15px 15px' : '0 15px 15px 15px'};
  background-color: ${({ isMine, theme }) =>
    isMine ? theme.COLORS.main : '#DDDDDD'};
  color: ${({ isMine, theme }) =>
    isMine ? theme.COLORS.white : theme.COLORS.black};
  font-size: ${({ theme }) => theme.FONT_SIZE.sm};
`;

const MessageContent = styled.div<{ isMine: boolean }>`
  display: flex;
  flex-direction: row;
  justify-content: ${({ isMine }) => (isMine ? 'flex-end' : 'flex-start')};
  align-items: center;
  width: 100%;
`;

const InputContainer = styled.div`
  display: flex;
  height: 40px;
  align-items: center;
  padding: 0 12px;
  border-radius: 20px;
  background-color: #eeeeee;
  margin: 0 10px 30px 10px;
`;

const Input = styled.input`
  flex: 1;
  height: 100%;
  border: none;
  outline: none;
  background-color: transparent;
  color: balck;
  font-size: 14px;

  &::placeholder {
    color: #b6b6b6;
  }
`;

const SendButton = styled.button`
  background: url(${sendIcon}) no-repeat center;
  border: none;
  width: 27px;
  height: 27px;
  border-radius: 50%;
  cursor: pointer;
`;

const ProfileContainer = styled.div<{ isMine: boolean }>`
  display: ${({ isMine }) => (isMine ? 'none' : 'flex')};
  align-items: center;
  margin-bottom: 5px;
`;

const ProfileText = styled.div`
  margin-left: 8px;
  font-size: ${({ theme }) => theme.FONT_SIZE.smMd};
`;

const ProfileImg = styled.img`
  border: none;
  width: 31px;
  height: 31px;
  border-radius: 50%;
  cursor: pointer;
`;
const TimeStamp = styled.span<{ isMine: boolean }>`
  font-size: ${({ theme }) => theme.FONT_SIZE.xs};
  color: #bfbfbf;
  padding: 5px;
  align-self: end;
`;

const DateContainer = styled.div`
  background-color: #eeeeee;
  color: #bfbfbf;
  font-size: ${({ theme }) => theme.FONT_SIZE.sm};
  padding: 8px 16px;
  border-radius: 20px;
  width: fit-content;
  margin: 0px auto;
`;

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
      setToday(new Date()); // 자정이 되면 날짜 업데이트
    }, msUntilMidnight);

    return () => clearTimeout(timer); // 컴포넌트 unmount 시 타이머 제거
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
    <ChatContainer>
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

      <DateContainer>{formatDate(today)}</DateContainer>
      <MessagesList>
        {messages?.chattingMessage
          ?.filter((msg) => msg.content !== null)
          .map((msg, index) => {
            const userProfile = userProfiles[msg.senderId];
            return (
              <Message key={index} isMine={msg.senderId === myId}>
                <ProfileContainer isMine={msg.senderId === myId}>
                  <ProfileImg
                    src={userProfile?.profileImageUrl || ProfileIcon}
                    alt={userProfile?.nickname || 'User Image'}
                  />
                  <ProfileText>
                    {userProfile
                      ? `${userProfile.nickname} | ${userProfile.mbti}`
                      : 'Loading...'}
                  </ProfileText>
                </ProfileContainer>
                <MessageContent isMine={msg.senderId === myId}>
                  <TimeStamp isMine={msg.senderId === myId}>
                    {formatTime(msg.regDate)}
                  </TimeStamp>
                  <MessageBox isMine={msg.senderId === myId}>
                    {msg.content}
                  </MessageBox>
                </MessageContent>
              </Message>
            );
          })}
      </MessagesList>

      <InputContainer>
        <Input
          value={inputText}
          onChange={handleInput}
          onKeyPress={handleKeyPress}
          placeholder="메시지 입력"
        />
        <SendButton onClick={handleSendMessage} />
      </InputContainer>
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
    </ChatContainer>
  );
};

export default ChatRoom;
