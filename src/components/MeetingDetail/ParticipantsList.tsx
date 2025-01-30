import styled from 'styled-components';
import CrownIcon from '@/assets/images/ic_crown_check.svg';
import { flexCenter, flexColumn } from '@/styles/CommonStyle';
import ParticipantIcon1 from '@/assets/images/ic_participant1.svg';
import ParticipantIcon2 from '@/assets/images/ic_participant2.svg';
import ParticipantIcon3 from '@/assets/images/ic_participant3.svg';
import ParticipantIcon4 from '@/assets/images/ic_participant4.svg';

interface Participant {
  userId: number;
  name: string;
  isHost?: boolean;
  isMe?: boolean;
}

interface ParticipantsListProps {
  participants: Participant[];
}

// 이미지 배열
const participantImages = [
  ParticipantIcon1,
  ParticipantIcon2,
  ParticipantIcon3,
  ParticipantIcon4,
];

const Container = styled.div`
  margin: 20px 0 0 31px;
`;

const Title = styled.div`
  font-size: ${({ theme }) => theme.FONT_SIZE.smMd};
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.light};
  display: flex;
  align-items: center;
  gap: 6px;
  color: ${({ theme }) => theme.COLORS.black};
`;

const ParticipantsContainer = styled.div`
  display: flex;
  gap: 24px;
  margin-top: 12px;
  align-items: center;
`;

const ParticipantWrapper = styled.div`
  ${flexColumn}
  align-items: center;
  position: relative;
`;

const ParticipantImage = styled.img`
  width: 45px;
  height: 45px;
  border-radius: 50%;
`;

const Crown = styled.img`
  position: absolute;
  top: -3px;
  right: -3px;
  width: 15px;
  height: 15px;
`;

const ParticipantName = styled.div`
  margin-top: 6px;
  font-size: ${({ theme }) => theme.FONT_SIZE.sm};
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.regular};
  color: ${({ theme }) => theme.COLORS.black};
  display: flex;
  align-items: center;
  gap: 6px;
`;

const Badge = styled.div`
  background: #636363;
  color: ${({ theme }) => theme.COLORS.white};
  font-size: ${({ theme }) => theme.FONT_SIZE.xs};
  width: 16px;
  height: 16px;
  border-radius: 50%;
  ${flexCenter}
`;

const ParticipantsList: React.FC<ParticipantsListProps> = ({
  participants,
}) => {
  return (
    <Container>
      <Title>
        <span>👥</span> 참여 중인 인원
      </Title>
      <ParticipantsContainer>
        {participants.map((participant) => (
          <ParticipantWrapper key={participant.userId}>
            <ParticipantImage
              src={
                participantImages[
                  Math.floor(Math.random() * participantImages.length)
                ]
              }
              alt={participant.name}
            />
            {participant.isHost && <Crown src={CrownIcon} alt="방장" />}
            <ParticipantName>
              {participant.isMe && <Badge>나</Badge>}
              <span>{participant.name}</span>
            </ParticipantName>
          </ParticipantWrapper>
        ))}
      </ParticipantsContainer>
    </Container>
  );
};

export default ParticipantsList;
