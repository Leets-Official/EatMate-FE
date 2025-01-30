import { useState } from 'react';
import styled from 'styled-components';
import Button from '@/components/common/Button/Button';
import Header from '@/components/common/Header/Header';
import MeetingDetailMain from '@/components/MeetingDetail/MeetingDetailMain';
import MailIcon from '@/assets/images/ic_invite_mail.svg';
import MeetingGuidModal from '@/components/common/Modal/MeetingGuideModal';
import { flexCenter } from '@/styles/CommonStyle';
import ParticipantsList from '@/components/MeetingDetail/ParticipantsList';

const Container = styled.div`
  margin: 0 auto;
  max-width: 390px;
  position: relative;
  padding-top: 25px;
  justify-content: center;
  overflow: hidden;
`;

const ButtonContainer = styled.div`
  ${flexCenter}
  flex-direction: row;
  gap: 30px;
  margin: 90px auto;
`;

const Icon = styled.img`
  width: 24px;
  height: 24px;
  display: block;
`;

const ToastMessage = styled.div<{ show: boolean }>`
  position: absolute;
  top: 80%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fbded0;
  color: ${({ theme }) => theme.COLORS.main};
  padding: 10px 20px;
  border-radius: 8px;
  font-size: ${({ theme }) => theme.FONT_SIZE.smMd};
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.bold};
  visibility: ${({ show }) => (show ? 'visible' : 'hidden')};
  opacity: ${({ show }) => (show ? '1' : '0')};
  transition: opacity 0.3s ease-in-out;
`;

const meetingMockData = {
  meetingType: 'delivery',
  title: '마라탕 맛나게 냠냠냠 ٩( ᐛ )و 모임',
  description: `마라탕 레전드 찐맛집입니다.
  맛도 좋고 정문 옆이라 자주 가는데 혼자 가기 뻘쭘해서 방 팝니다!`,
  gender: '여자만',
  location: '마라탕집',
  placeName: '맛있겠어요점',
  time: '오후 6시 10분',
  chatTime: '30분',
  backgroundImage: 'sdf',
  isOwner: true,
  participants: [
    {
      userId: 0,
      name: '이유진',
      isOwner: true,
      isCurrentUser: true,
    },
    {
      userId: 1,
      name: '계다현',
      isOwner: true,
      isCurrentUser: false,
    },
    {
      userId: 2,
      name: '홍길동',
      isOwner: true,
      isCurrentUser: false,
    },
    {
      userId: 3,
      name: '음음음',
      isOwner: true,
      isCurrentUser: false,
    },
  ],
};

const MeetingDetail = () => {
  const [showToast, setShowToast] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleInviteClick = () => {
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 2000);
  };

  const handleLeave = () => {
    alert('모임에서 나갔습니다.');
  };

  return (
    <Container>
      <Header
        title=" "
        showBackButton={true}
        onBackClick={() => console.log('뒤로가기 클릭')}
        isJoin={true}
        onLeaveClick={handleLeave}
      />
      <MeetingDetailMain
        meetingType={meetingMockData.meetingType}
        title={meetingMockData.title}
        description={meetingMockData.description}
        gender={meetingMockData.gender}
        location={meetingMockData.location}
        placeName={meetingMockData.placeName}
        time={meetingMockData.time}
        chatTime={meetingMockData.chatTime}
      />
      <ParticipantsList participants={meetingMockData.participants} />

      <ButtonContainer>
        <Button
          variant="primary-outline"
          size="sm"
          rounded="sm"
          onClick={handleInviteClick}
        >
          <Icon src={MailIcon} alt="초대" />
          초대하기
        </Button>
        {meetingMockData.isOwner ? (
          <>
            <Button size="sm" rounded="sm">
              수정하기
            </Button>
          </>
        ) : (
          <Button size="sm" rounded="sm" onClick={() => setIsModalOpen(true)}>
            참여하기
          </Button>
        )}
      </ButtonContainer>
      {isModalOpen && (
        <MeetingGuidModal onClose={() => setIsModalOpen(false)} />
      )}
      <ToastMessage show={showToast}>모임링크가 복사되었어요!</ToastMessage>
    </Container>
  );
};

export default MeetingDetail;
