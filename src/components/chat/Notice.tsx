import React from 'react';
import styled from 'styled-components';
import Speaker from '@/assets/images/ic_speaker.svg';

const NotificationButton = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 20px;
  border-radius: 5px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2);
  margin: 10px;
  background-color: white;
`;

const IconContainer = styled.div`
  margin-right: 16px;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
`;

const Title = styled.div`
  font-size: ${({ theme }) => theme.FONT_SIZE.sm};
  margin-bottom: 4px;
`;

const Icon = styled.img`
  width: 24px;
  height: 24px;
`;
interface NoticeProps {
  type: 'delivery' | 'meeting';
  place: string;
  details: string;
  extraInfo?: string;
}

const Notice: React.FC<NoticeProps> = ({ type, place, details, extraInfo }) => (
  <NotificationButton>
    <IconContainer>
      <Icon src={Speaker} alt="Icon" />
    </IconContainer>
    <TextContainer>
      <Title>
        {type === 'delivery' ? '배달가게' : '장소'}: {place}
      </Title>
      <Title>
        {type === 'delivery' ? `주문번호: ${details}` : `시간: ${details}`}
      </Title>
      {extraInfo && <Title>픽업장소: {extraInfo}</Title>}
    </TextContainer>
  </NotificationButton>
);

export default Notice;
