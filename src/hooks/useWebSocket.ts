import { useState, useEffect, useRef, useCallback } from 'react';
import { CompatClient, Stomp } from '@stomp/stompjs';

interface ChatMessageFromClient {
  senderId: number;
  content: string;
  chatRoomId: number;
  regDate: string;
}

interface ChatMessagesFromServerFull {
  chattingMessage: Array<{
    messageId: number;
    content: string;
    senderId: number;
    chatRoomId: number;
    regDate: string;
  }>;
}

const useWebSocket = (roomId: number | null) => {
  const stompClientRef = useRef<CompatClient | null>(null);
  const [messages, setMessages] = useState<ChatMessagesFromServerFull | null>(
    null
  );
  const baseUrl = import.meta.env.VITE_BASE_URL; // WebSocket 서버 URL
  const handleDisconnect = useCallback(() => {
    if (stompClientRef.current) {
      stompClientRef.current.disconnect();
      console.log('WebSocket 연결 해제');
      stompClientRef.current = null;
    }
  }, []);
  useEffect(() => {
    if (roomId && !stompClientRef.current) {
      const connectWebSocket = () => {
        console.log('WebSocket 연결중');
        const ws = new WebSocket(`${baseUrl}/ws/chat`);
        const client = Stomp.over(ws);

        client.connect(
          {},
          () => {
            console.log('클라이언트 연결 성공');
            client.subscribe(`/topic/chat.${roomId}`, (message: any) => {
              console.log('새로운 메시지 수신:', JSON.parse(message.body));
              const receivedMessage = JSON.parse(message.body);
              setMessages((prev) => ({
                ...prev,
                chattingMessage: [
                  ...(prev?.chattingMessage || []),
                  receivedMessage,
                ],
              }));
            });

            console.log(messages, 'socket');
          },
          (error: any) => {
            console.error('WebSocket 연결 실패:', error);
          }
        );

        stompClientRef.current = client;
      };

      connectWebSocket();
    }

    return () => {
      if (stompClientRef.current) {
        stompClientRef.current.disconnect();
        console.log('WebSocket 연결 해제');
        stompClientRef.current = null;
      }
    };
  }, [roomId, baseUrl]);

  const sendMessage = useCallback(
    (message: ChatMessageFromClient) => {
      if (stompClientRef.current?.connected) {
        stompClientRef.current.send(
          `/pub/chat.${roomId}`,
          {},
          JSON.stringify(message)
        );
        console.log('메시지 전송:', message);
      }
    },
    [roomId]
  );

  return {
    sendMessage,
    messages,
    disconnect: handleDisconnect,
  };
};

export default useWebSocket;
