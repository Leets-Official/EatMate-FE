import React, { useState } from 'react';
import styled from 'styled-components';
import sendIcon from '@/assets/images/ic_backImg_default1.svg';

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  justify-content: space-between;
  background-color: #fafafa;
`;

const MessagesList = styled.div`
  padding: 20px;
  overflow-y: scroll;
`;

const Message = styled.div<{ isMine: boolean }>`
  display: flex;
  justify-content: ${({ isMine }) => (isMine ? 'flex-end' : 'flex-start')};
  align-items: flex-end;
  margin: 10px 0;
`;

const MessageBox = styled.div<{ isMine: boolean }>`
  max-width: 70%;
  padding: 10px;
  margin: ${({ isMine }) => (isMine ? '0 0 0 10px' : '0 10px 0 0')};
  border-radius: 20px;
  background-color: ${({ isMine }) => (isMine ? '#ff7e67' : '#ffffff')};
  color: ${({ isMine }) => (isMine ? '#ffffff' : '#000000')};
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  position: relative;
  font-size: 16px;
`;

const InputContainer = styled.div`
  display: flex;
  height: 40px;
  align-items: center;
  padding: 0 12px;
  border-radius: 20px;
  background-color: #eeeeee;
  color: white;
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
  background-color: #ff7e67;
  border: none;
  width: 27px;
  height: 27px;
  border-radius: 50%;
  cursor: pointer;
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

  return (
    <ChatContainer>
      <MessagesList>
        {messages.map((msg) => (
          <Message key={msg.id} isMine={msg.isMine}>
            <MessageBox isMine={msg.isMine}>{msg.text}</MessageBox>
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
