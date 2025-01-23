import styled from 'styled-components';
import ParticipantIcon1 from '@/assets/images/ic_participant1.png';
import ParticipantIcon2 from '@/assets/images/ic_participant2.png';
import ParticipantIcon3 from '@/assets/images/ic_participant3.png';
import ParticipantIcon4 from '@/assets/images/ic_participant4.png';
import CrownIcon from '@/assets/images/ic_crown_check.svg';

interface Participant {
  id: number;
  name: string;
  image: string;
  isHost?: boolean;
  isMe?: boolean;
}

const participants: Participant[] = [
  { id: 1, name: '가천', image: ParticipantIcon1, isHost: true, isMe: true },
  { id: 2, name: '김잇메', image: ParticipantIcon2 },
  { id: 3, name: '무당벌레', image: ParticipantIcon3 },
  { id: 4, name: '친구', image: ParticipantIcon4 },
];

const Container = styled.div`
  margin-top: 20px;
`;

const Title = styled.div`
  font-size: 16px;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 6px;
  color: ${({ theme }) => theme.COLORS.black};
`;

const ParticipantsContainer = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 12px;
`;

const ParticipantWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ParticipantImageWrapper = styled.div<{ isMe?: boolean }>`
  position: relative;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  overflow: hidden;
  background-color: ${({ isMe, theme }) =>
    isMe ? theme.COLORS.primary : 'transparent'};
`;

const ParticipantImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
`;

const Crown = styled.img`
  position: absolute;
  top: 0;
  right: 0;
  width: 18px;
  height: 18px;
`;

const ParticipantName = styled.div`
  margin-top: 6px;
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.COLORS.black};
`;

const Badge = styled.div`
  position: absolute;
  bottom: -5px;
  left: 50%;
  transform: translateX(-50%);
  background: ${({ theme }) => theme.COLORS.gray[800]};
  color: white;
  font-size: 12px;
  font-weight: bold;
  padding: 2px 8px;
  border-radius: 12px;
`;

const ParticipantsList = () => {
  return (
    <Container>
      <Title>
        <span>👥</span> 참여 중인 인원
      </Title>
      <ParticipantsContainer>
        {participants.map((participant) => (
          <ParticipantWrapper key={participant.id}>
            <ParticipantImageWrapper isMe={participant.isMe}>
              <ParticipantImage
                src={participant.image}
                alt={participant.name}
              />
              {participant.isHost && <Crown src={CrownIcon} alt="방장" />}
              {participant.isMe && <Badge>나</Badge>}
            </ParticipantImageWrapper>
            <ParticipantName>{participant.name}</ParticipantName>
          </ParticipantWrapper>
        ))}
      </ParticipantsContainer>
    </Container>
  );
};

export default ParticipantsList;
