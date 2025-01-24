import React from 'react';
import styled from 'styled-components';
import HandIcon from '@/assets/images/ic_open hand.svg';
import Button from '../Button/Button';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
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
}

const MeetingGuidModal: React.FC<MeetingGuidModalProps> = ({ onClose }) => {
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
            onClick={onClose}
          >
            확인했어요
          </Button>
        </ButtonContainer>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default MeetingGuidModal;
