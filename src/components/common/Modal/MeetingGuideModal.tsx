import React from 'react';
import styled from 'styled-components';
import HandIcon from '@/assets/images/ic_open_hand.svg';

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
  padding: 24px 20px;
  width: 300px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  position: relative;
`;

const Title = styled.h2`
  font-size: ${({ theme }) => theme.FONT_SIZE.md};
  font-weight: bold;
  color: ${({ theme }) => theme.COLORS.black};
  margin-bottom: 8px;
`;

const Icon = styled.img`
  margin-bottom: 16px;
  width: 60px;
  height: 60px;
`;

const RuleList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
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
  margin-top: 20px;
`;

const Button = styled.button<{ primary?: boolean }>`
  flex: 1;
  padding: 12px 0;
  border-radius: 8px;
  font-size: ${({ theme }) => theme.FONT_SIZE.sm};
  font-weight: 600;
  cursor: pointer;
  background: ${({ primary, theme }) =>
    primary ? theme.COLORS.main : theme.COLORS.white};
  border: ${({ primary, theme }) =>
    primary ? 'none' : `1px solid ${theme.COLORS.main}`};
  color: ${({ primary, theme }) =>
    primary ? theme.COLORS.white : theme.COLORS.main};

  &:first-child {
    margin-right: 10px;
  }
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
            <strong>1. 존중과 예의를 지켜주세요</strong>
            <br />
            상대방에게 예의를 갖추고, 비방이나 공격적인 언행을 삼가주세요.
          </RuleItem>
          <RuleItem>
            <strong>2. 약속 시간을 반드시 지켜주세요</strong>
            <br />
            모임 시작 시간에 늦지 않도록 하고, 불참 시 미리 주최자에게
            알려주세요.
          </RuleItem>
        </RuleList>
        <ButtonContainer>
          <Button onClick={onClose}>뒤로가기</Button>
          <Button primary onClick={onClose}>
            확인했어요
          </Button>
        </ButtonContainer>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default MeetingGuidModal;
