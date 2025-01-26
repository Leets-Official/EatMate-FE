import styled from 'styled-components';
import ParticipantIcon1 from '@/assets/images/ic_participant1.svg';
import ParticipantIcon2 from '@/assets/images/ic_participant2.svg';
import ParticipantIcon3 from '@/assets/images/ic_participant3.svg';
import ParticipantIcon4 from '@/assets/images/ic_participant4.svg';
import CrownIcon from '@/assets/images/ic_crown_check.svg';
import { flexCenter, flexColumn } from '@/styles/CommonStyle';

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
const ParticipantsList = () => {
  return (
    <Container>
      <Title>
        <span>👥</span> 참여 중인 인원
      </Title>
      <ParticipantsContainer>
        {participants.map((participant) => (
          <ParticipantWrapper key={participant.id}>
            <ParticipantImage src={participant.image} alt={participant.name} />
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
