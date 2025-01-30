import styled from 'styled-components';
import CrownIcon from '@/assets/images/ic_crown_check.svg';
import ParticipantIcon1 from '@/assets/images/ic_participant1.svg';
import ParticipantIcon2 from '@/assets/images/ic_participant2.svg';
import ParticipantIcon3 from '@/assets/images/ic_participant3.svg';
import ParticipantIcon4 from '@/assets/images/ic_participant4.svg';
import { flexCenter } from '@/styles/CommonStyle';
import ExitIcon from '@/assets/images/ic_exit.svg';
const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: flex-end;
`;

const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 50%;
  background-color: white;
  padding: 20px;
  height: 100%;
`;

const Title = styled.div`
  margin-bottom: 20px;
  font-size: 18px;
  color: #333;
`;
const Description = styled.div`
  color: ${({ theme }) => theme.COLORS.gray[300]};
  margin-bottom: 20px;
`;

const UserContainer = styled.div`
  ${flexCenter}
  margin: 10px 0;
  gap: 5px;
`;

const ParticipantImage = styled.img`
  width: 45px;
  height: 45px;
  border-radius: 50%;
`;
const UserName = styled.span`
  font-size: 16px;
  color: #333;
  flex-grow: 1;
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
const Crown = styled.img`
  width: 15px;
  height: 15px;
`;
const Divider = styled.div`
  width: 120%;
  height: 10px;
  background-color: #f9f9fc;
  margin-left: -20px;
`;
const ExitButton = styled.button`
  background-color: ${({ theme }) => theme.COLORS.white};
  width: 28px;
  height: 28px;
  border: none;
  cursor: pointer;
`;

const participants = [
  { name: '가족', image: ParticipantIcon1, isMe: true, isHost: false },
  { name: '친인미', image: ParticipantIcon2, isMe: false, isHost: true },
  { name: '모둠멜론', image: ParticipantIcon3, isMe: false, isHost: false },
  { name: '황아정', image: ParticipantIcon4, isMe: false, isHost: false },
];

interface ChatModalProps {
  onClose: () => void;
}

const ChatModal: React.FC<ChatModalProps> = ({ onClose }) => (
  <Overlay>
    <ModalContainer>
      <div>
        <Title>마라탕 맛집 평가하기</Title>
        <Description>n명 참여중</Description>
        <Divider />
        {participants.map((user) => (
          <UserContainer key={user.name}>
            <ParticipantImage src={user.image} alt={user.name} />
            {user.isHost && <Crown src={CrownIcon} alt="방장" />}
            {user.isMe && <Badge>나</Badge>}
            <UserName>{user.name}</UserName>
          </UserContainer>
        ))}
      </div>
      <ExitButton onClick={() => onClose()}>
        <img src={ExitIcon} alt="나가기" />
      </ExitButton>
    </ModalContainer>
  </Overlay>
);

export default ChatModal;
