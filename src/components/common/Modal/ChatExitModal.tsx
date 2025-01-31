import React from 'react';
import styled from 'styled-components';
import Button from '@/components/common/Button/Button';
import { flexCenter } from '@/styles/CommonStyle';
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

const Description = styled.div`
  font-size: ${({ theme }) => theme.FONT_SIZE.sm};
  color: #707070;
  margin: 10px 0;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
`;

interface ChatExitModalProps {
  onClose: () => void;
}

const ChatExitModal: React.FC<ChatExitModalProps> = ({ onClose }) => {
  return (
    <ModalOverlay>
      <ModalContainer>
        <Title>채팅방 나가기</Title>
        <Description>
          채팅방을 나가시면 그동안 이야기하신 모든 내용과 모임 참여 기록들이
          삭제됩니다. <br />
          정말로 나가시겠어요?
        </Description>
        <ButtonContainer>
          <Button
            variant="secondary-white"
            size="xs"
            rounded="lg"
            onClick={onClose}
          >
            네, 나갈게요
          </Button>
          <Button
            variant="secondary-main"
            size="xs"
            rounded="lg"
            onClick={onClose}
          >
            아니오
          </Button>
        </ButtonContainer>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default ChatExitModal;
