import styled from 'styled-components';

const Container = styled.div`
  margin: 20px 0;
`;

const Title = styled.h3`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const ParticipantList = styled.div`
  display: flex;
  gap: 15px;
`;

const ParticipantItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ProfileImage = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 5px;
`;

const Name = styled.span`
  font-size: 14px;
  color: #333;
`;

const Badge = styled.span`
  font-size: 12px;
  color: #ff7f50; /* 주황색으로 강조 */
  font-weight: bold;
  margin-top: 3px;
`;

interface Participant {
  id: number;
  name: string;
  imageUrl: string;
  isLeader?: boolean; // 리더 여부
}

const ParticipantsList = ({
  participants,
}: {
  participants: Participant[];
}) => {
  return (
    <Container>
      <Title>참여 중인 인원</Title>
      <ParticipantList>
        {participants.map((participant) => (
          <ParticipantItem key={participant.id}>
            <ProfileImage src={participant.imageUrl} alt={participant.name} />
            <Name>{participant.name}</Name>
            {participant.isLeader && <Badge>👑 방장</Badge>}
          </ParticipantItem>
        ))}
      </ParticipantList>
    </Container>
  );
};

export default ParticipantsList;
