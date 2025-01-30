import styled from 'styled-components';

import { flexColumn } from '@/styles/CommonStyle';
import { meetingInfoContents } from '@/constants/meetingInfoContents';

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
  ${flexColumn}
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
      {meetingInfoContents.map((item, index) => (
        <InfoItem key={index}>
          <Icon src={item.icon} alt={item.alt} />
          <InfoTitle>{item.title(gender, location, placeName, time)}</InfoTitle>
          {item.highlightedText && (
            <HighlightedText>{item.highlightedText(chatTime)}</HighlightedText>
          )}
        </InfoItem>
      ))}
    </InfoContainer>
  );
};

export default MeetingInfo;
