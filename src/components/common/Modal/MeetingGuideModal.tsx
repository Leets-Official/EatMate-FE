import React, { useEffect } from 'react';
import styled from 'styled-components';
import HandIcon from '@/assets/images/ic_open hand.svg';
import Button from '@/components/common/Button/Button';
import { flexCenter } from '@/styles/CommonStyle';
import { useNavigate } from 'react-router-dom';
import defaultInstance from '@/apis/axiosInstance';
import {
  enterDeliveryChatRoom,
  enterOfflineChatRoom,
} from '@/apis/meetings/enterChatRoom';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  ${flexCenter}
`;

const ModalContainer = styled.div`
  background: ${({ theme }) => theme.COLORS.white};
  border-radius: 16px;
  padding: 24px 30px;
  max-width: 300px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  position: relative;
`;

const Title = styled.div`
  font-size: ${({ theme }) => theme.FONT_SIZE.md};
  color: ${({ theme }) => theme.COLORS.black};
  margin-bottom: 5px;
`;

const Icon = styled.img`
  width: 100px;
  margin-top: 5px;
`;

const RuleList = styled.ul`
  margin-top: 15px;
  list-style: none;
  padding: 0 15px;
  text-align: left;
`;

const RuleItem = styled.li`
  font-size: ${({ theme }) => theme.FONT_SIZE.sm};
  margin-bottom: 16px;
  color: ${({ theme }) => theme.COLORS.black};
  line-height: 1.5;

  strong {
    font-weight: bold;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
`;

interface MeetingGuidModalProps {
  onClose: () => void;
  chatRoomId: number;
  isCurrentUser: boolean;
  meetingType: string;
  meetingId: string;
}

const MeetingGuidModal: React.FC<MeetingGuidModalProps> = ({
  onClose,
  chatRoomId,
  isCurrentUser,
  meetingType,
  meetingId,
}) => {
  const getMyId = async () => {
    const response = await defaultInstance.get(`/api/profile/myinfo`);
    return response.data.result.memberId;
  };

  const navi = useNavigate();

  console.log('가이드 모달', meetingId);

  // chatRoomId 변경 시 localStorage에 저장
  useEffect(() => {
    if (chatRoomId) {
      localStorage.setItem('chatRoomId', chatRoomId.toString());
    }
  }, [chatRoomId]);

  const handleCheck = async () => {
    try {
      const myId = await getMyId();
      localStorage.setItem('myId', myId.toString());

      // 현재 사용자가 채팅방 창조자가 아닌 경우, 적절한 채팅방 입장 처리
      if (!isCurrentUser) {
        const roomId = parseInt(meetingId, 10);
        enterChatRoom(meetingType, roomId)
          .then(() => {
            navi('/chatting');
          })
          .catch((error) => {
            console.error('채팅방 입장 실패:', error);
          });
      } else {
        navi('/chatting');
      }
    } catch (error) {
      console.error('채팅방 입장 처리 중 에러 발생:', error);
    } finally {
      onClose();
    }
  };

  // 채팅방 입장

  async function enterChatRoom(meetingType: string, roomId: number) {
    const response =
      meetingType === 'DELIVERY'
        ? await enterDeliveryChatRoom(roomId)
        : await enterOfflineChatRoom(roomId);

    console.log(`${meetingType} chat room entered:`, response);
    return response;
  }

  return (
    <ModalOverlay>
      <ModalContainer>
        <Title>이용규칙</Title>
        <Icon src={HandIcon} alt="손" />
        <RuleList>
          <RuleItem>
            <Title>1. 존중과 예의를 지켜주세요</Title>
            상대방에게 예의를 갖추고, 비방이나 공격적인 언행을 삼가주세요.
          </RuleItem>
          <RuleItem>
            <Title>2. 약속 시간을 반드시 지켜주세요</Title>
            모임 시작 시간에 늦지 않도록 하고, 불참 시 미리 주최자에게
            알려주세요.
          </RuleItem>
        </RuleList>
        <ButtonContainer>
          <Button
            variant="secondary-white"
            size="xs"
            rounded="lg"
            onClick={onClose}
          >
            뒤로가기
          </Button>
          <Button
            variant="secondary-main"
            size="xs"
            rounded="lg"
            onClick={handleCheck}
          >
            확인했어요
          </Button>
        </ButtonContainer>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default MeetingGuidModal;
