import React, { useState, useEffect } from 'react';
import useWebSocket from '../hooks/useWebSocket';
import defaultInstance from '@/apis/axiosInstance';

interface ChatMessage {
  senderId: number;
  content: string;
  chatRoomId: number;
  regDate: string;
}

const TestChat = () => {
  const roomId = 123; // 이 예제에서는 하드코딩된 채팅방 ID를 사용합니다.
  const myId = parseInt(localStorage.getItem('myId') || '0', 10);
  const { sendMessage, messages, disconnect } = useWebSocket(roomId);
  const [newMessage, setNewMessage] = useState('');

  //  console.log(getMyId());
  // 채팅방에서 메시지 전송 처리
  const handleSendMessage = async () => {
    const message: ChatMessage = {
      senderId: myId, // 비동기적으로 가져온 ID 할당
      content: newMessage,
      chatRoomId: roomId,
      regDate: new Date().toISOString(),
    };

    sendMessage(message);
    setNewMessage(''); // 메시지 전송 후 입력 필드 초기화
  };

  // 채팅 입력 핸들러
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessage(event.target.value);
  };

  // 메시지 전송을 엔터 키로도 가능하게 함
  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleSendMessage();
    }
  };

  // 페이지 이탈 시 연결 해제
  useEffect(() => {
    return () => {
      disconnect();
    };
  }, [disconnect]);

  return (
    <div>
      <h1>채팅방</h1>
      <div>
        {messages?.chattingMessage.map((msg, index) => (
          <div key={index}>연결 성공</div>
        ))}
      </div>
      <input
        type="text"
        value={newMessage}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        placeholder="메시지 입력..."
      />
      <button onClick={handleSendMessage}>보내기</button>
    </div>
  );
};

export default TestChat;
