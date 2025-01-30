import React, { useState } from 'react';
import styled from 'styled-components';
import sendIcon from '@/assets/images/ic_backImg_default1.svg';
import Header from '@/components/common/Header/Header';
import ProfileIcon from '@/assets/images/ic_participant1.svg';
import Notice from '@/components/chat/Notice';

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  justify-content: space-between;
  background-color: #fafafa;
`;

const MessagesList = styled.div`
  padding: 10px;
`;

const Message = styled.div<{ isMine: boolean }>`
  display: flex;
  flex-direction: column;
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
  padding: 0 8px 5px 8px;
  align-self: end;
`;

interface IMessage {
  id: number;
  text: string;
  isMine: boolean;
  time: string;
}

const ChatRoom = () => {
  const [messages, setMessages] = useState<IMessage[]>([
    {
      id: 1,
      text: '안녕하세요~ 18시 10분에 만나요.',
      isMine: false,
      time: '오전 5:45',
    },
  ]);
  const [inputText, setInputText] = useState('');

  const handleSendMessage = () => {
    if (inputText.trim()) {
      const newMessage = {
        id: messages.length + 1,
        text: inputText,
        isMine: true,
        time: new Date().toLocaleTimeString('ko-KR', {
          hour: '2-digit',
          minute: '2-digit',
        }),
      };
      setMessages([...messages, newMessage]);
      setInputText('');
    }
  };

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(event.target.value);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSendMessage();
    }
  };

  const handleMenu = () => {
    console.log('메뉴 클릭');
  };
  return (
    <ChatContainer>
      <Header
        title="모임 제목"
        showBackButton={true}
        onBackClick={() => console.log('뒤로가기 클릭')}
        isMenu={true}
        onMenuClick={handleMenu}
      />
      <Notice title="마라탕 맛잇겟엉점" time="13시 30분" />
      <MessagesList>
        {messages.map((msg) => (
          <Message key={msg.id} isMine={msg.isMine}>
            <ProfileContainer isMine={msg.isMine}>
              <ProfileImg src={ProfileIcon} alt="User Image" />
              <ProfileText>{'이름 | ISFP'}</ProfileText>
            </ProfileContainer>
            <MessageContent isMine={msg.isMine}>
              {msg.isMine && (
                <TimeStamp isMine={msg.isMine}>{msg.time}</TimeStamp>
              )}
              <MessageBox isMine={msg.isMine}>{msg.text}</MessageBox>
              {!msg.isMine && (
                <TimeStamp isMine={msg.isMine}>{msg.time}</TimeStamp>
              )}
            </MessageContent>
          </Message>
        ))}
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
    </ChatContainer>
  );
};

export default ChatRoom;
