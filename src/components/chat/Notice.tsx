import React from 'react';
import styled from 'styled-components';
import Speaker from '@/assets/images/ic_speaker.svg';

const NotificationButton = styled.div`
  display: flex;
  padding: 10px 20px;
  border-radius: 5px;
  box-shadow: 0 3px 50px rgba(0, 0, 0, 0.35);
  align-items: center;
  margin: 0 10px;
`;

const IconContainer = styled.div`
  margin-right: 16px;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
`;

const Title = styled.span`
  font-size: ${({ theme }) => theme.FONT_SIZE.sm};
  margin-bottom: 4px;
`;

const Icon = styled.img`
  width: 24px;
  height: 24px;
`;

interface NoticeProps {
  title: string;
  time: string;
}

const Notice: React.FC<NoticeProps> = ({ title, time }) => (
  <NotificationButton>
    <IconContainer>
      <Icon src={Speaker} alt="공지" />
    </IconContainer>
    <TextContainer>
      <Title>장소: {title}</Title>
      <Title>시간: {time}</Title>
    </TextContainer>
  </NotificationButton>
);

export default Notice;
