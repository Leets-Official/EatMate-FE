import styled from 'styled-components';
import CrownIcon from '@/assets/images/ic_crown_check.svg';
import { flexCenter, flexColumn } from '@/styles/CommonStyle';
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
  ${flexColumn}
  justify-content: space-between;
  width: 50%;
  background-color: ${({ theme }) => theme.COLORS.white};
  padding: 20px;
  height: 100%;
  box-sizing: border-box;
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

interface Participant {
  memberId: number;
  nickname: string;
  mbti: string;
  profileImageUrl: string;
  role: string;
  isMine: boolean;
}

interface ChatModalProps {
  onClose: () => void;
  onExit: () => void;
  participants: Participant[];
  title: string;
}

const ChatModal: React.FC<ChatModalProps> = ({
  onClose,
  onExit,
  participants,
  title,
}) => {
  const handleOverlayClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <Overlay onClick={handleOverlayClick}>
      <ModalContainer>
        <div>
          <Title>{title}</Title>
          <Description>{participants.length}명 참여중</Description>
          <Divider />
          {participants.map((user) => (
            <UserContainer key={user.nickname}>
              <ParticipantImage
                src={user.profileImageUrl}
                alt={user.nickname}
              />
              {user.role !== 'PARTICIPANT' && (
                <Crown src={CrownIcon} alt="방장" />
              )}
              {user.isMine && <Badge>나</Badge>}
              <UserName>{user.nickname}</UserName>
            </UserContainer>
          ))}
        </div>
        <ExitButton onClick={onExit}>
          <img src={ExitIcon} alt="나가기" />
        </ExitButton>
      </ModalContainer>
    </Overlay>
  );
};

export default ChatModal;
