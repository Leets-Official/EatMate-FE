import styled from 'styled-components';
import PeopleIcon from '@/assets/images/ic_people_line.svg';
import LocationIcon from '@/assets/images/ic_locate.svg';
import CalendarIcon from '@/assets/images/ic_calendar.svg';
import ChatIcon from '@/assets/images/ic_chat.svg';

interface MeetingInfoProps {
  gender: string;
  location: string;
  placeName: string;
  time: string;
  chatTime: string;
}

const InfoContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: flex-start;
  margin-top: 36px;
`;

const InfoItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 14px;
  min-width: 80px;
  text-align: center;
`;

const InfoTitle = styled.div`
  font-size: ${({ theme }) => theme.FONT_SIZE.sm};
  color: ${({ theme }) => theme.COLORS.gray[600]};
  margin-top: 9px;
  text-align: center;
`;

const HighlightedText = styled.div`
  color: ${({ theme }) => theme.COLORS.main};
  font-size: ${({ theme }) => theme.FONT_SIZE.xs};
`;

const Icon = styled.img`
  width: 24px;
  height: 24px;
  display: block;
`;

const MeetingInfo: React.FC<MeetingInfoProps> = ({
  gender,
  location,
  placeName,
  time,
  chatTime,
}) => {
  return (
    <InfoContainer>
      <InfoItem>
        <Icon src={PeopleIcon} alt="참가자 아이콘" />
        <InfoTitle>{gender}</InfoTitle>
      </InfoItem>
      <InfoItem>
        <Icon src={LocationIcon} alt="위치 아이콘" />
        <InfoTitle>
          {location} <br /> {placeName}
        </InfoTitle>
      </InfoItem>
      <InfoItem>
        <Icon src={CalendarIcon} alt="캘린더 아이콘" />
        <InfoTitle>
          {time.split(' ')[0]} <br /> {time.split(' ')[1]}
        </InfoTitle>
      </InfoItem>
      <InfoItem>
        <Icon src={ChatIcon} alt="채팅 아이콘" />
        <InfoTitle>채팅</InfoTitle>
        <HighlightedText>{chatTime} 전 대화</HighlightedText>
      </InfoItem>
    </InfoContainer>
  );
};

export default MeetingInfo;
