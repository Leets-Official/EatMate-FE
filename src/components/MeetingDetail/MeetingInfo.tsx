// src/components/MeetingDetail/MeetingDetailInfo.tsx
import styled from 'styled-components';
import PeopleIcon from '@/assets/images/ic_people_line.svg';
import LocationIcon from '@/assets/images/ic_locate.svg';
import CalendarIcon from '@/assets/images/ic_calendar.svg';
import ChatIcon from '@/assets/images/ic_chat.svg';

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
  text-align: center;
`;

const HighlightedText = styled.div`
  color: ${({ theme }) => theme.COLORS.main};
  font-size: 12px;
  font-weight: 600;
`;

const Icon = styled.img`
  width: 24px;
  height: 24px;
`;

const MeetingInfo = () => {
  return (
    <InfoContainer>
      <InfoItem>
        <Icon src={PeopleIcon} alt="참가자 아이콘" />
        <InfoTitle>여자만</InfoTitle>
      </InfoItem>
      <InfoItem>
        <Icon src={LocationIcon} alt="위치 아이콘" />
        <InfoTitle>
          마라탕집 <br /> 맛있겠어요점
        </InfoTitle>
      </InfoItem>
      <InfoItem>
        <Icon src={CalendarIcon} alt="캘린더 아이콘" />
        <InfoTitle>
          오후 <br /> 6시 10분
        </InfoTitle>
      </InfoItem>
      <InfoItem>
        <Icon src={ChatIcon} alt="채팅 아이콘" />
        <HighlightedText>30분 전 대화</HighlightedText>
      </InfoItem>
    </InfoContainer>
  );
};

export default MeetingInfo;
