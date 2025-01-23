// src/components/MeetingDetail/MeetingDetailInfo.tsx
import styled from 'styled-components';
import PeopleIcon from '@/assets/icons/people.svg?react';
import LocationIcon from '@/assets/icons/ic_location.svg?react';
import CalendarIcon from '@/assets/icons/ic_calendar.svg?react';
import ChatIcon from '@/assets/icons/ic_chat.svg?react';

const InfoContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 16px 0;
  border-top: 1px solid ${({ theme }) => theme.COLORS.gray[200]};
`;

const InfoItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 14px;
  color: ${({ theme }) => theme.COLORS.gray[400]};
`;

const InfoTitle = styled.div`
  font-size: 12px;
  margin-top: 4px;
`;

const HighlightedText = styled.div`
  color: ${({ theme }) => theme.COLORS.main};
  font-size: 12px;
  font-weight: 600;
`;

const MeetingInfo = () => {
  return (
    <InfoContainer>
      <InfoItem>
        <PeopleIcon />
        <InfoTitle>여자만</InfoTitle>
      </InfoItem>
      <InfoItem>
        <LocationIcon />
        <InfoTitle>
          마라탕집 <br /> 맛있겠어요점
        </InfoTitle>
      </InfoItem>
      <InfoItem>
        <CalendarIcon />
        <InfoTitle>
          오후 <br /> 6시 10분
        </InfoTitle>
      </InfoItem>
      <InfoItem>
        <ChatIcon />
        <HighlightedText>30분 전 대화</HighlightedText>
      </InfoItem>
    </InfoContainer>
  );
};

export default MeetingInfo;
