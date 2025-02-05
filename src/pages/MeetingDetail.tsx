import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Button from '@/components/common/Button/Button';
import Header from '@/components/common/Header/Header';
import MeetingDetailMain from '@/components/MeetingDetail/MeetingDetailMain';
import MailIcon from '@/assets/images/ic_invite_mail.svg';
import MeetingGuidModal from '@/components/common/Modal/MeetingGuideModal';
import { flexCenter } from '@/styles/CommonStyle';
import ParticipantsList from '@/components/MeetingDetail/ParticipantsList';
import { useNavigate, useParams } from 'react-router-dom';
import { getMeetingDetailApi, MeetingData } from '@/apis/meetings/getMeeting';
import Loading from '@/components/common/Loading';

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

const MeetingDetail = () => {
  const [meetingData, setMeetingData] = useState<MeetingData | null>(null);
  const [showToast, setShowToast] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { meetingId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const navi = useNavigate();

  useEffect(() => {
    const fetchMeetingDetail = async () => {
      try {
        const data = await getMeetingDetailApi(meetingId!);
        setMeetingData(data);
      } catch (error) {
        alert('모임 정보를 불러오는데 실패했습니다.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchMeetingDetail();
  }, []);

  const handleInviteClick = () => {
    // 현재 페이지 URL 가져오기
    const url = window.location.href;

    // 클립보드에 URL 복사
    navigator.clipboard
      .writeText(url)
      .then(() => {
        setShowToast(true);
        setTimeout(() => {
          setShowToast(false);
        }, 2000);
      })
      .catch((err) => {
        console.error('클립보드에 복사 실패:', err);
        alert('링크 복사에 실패했습니다. 다시 시도해주세요.');
      });
  };

  const handleLeave = () => {
    alert('모임에서 나갔습니다.');
    // TODO: 채팅방 나가기 연결,,, 하면서 추가
  };

  const handleEdit = () => {
    if (!meetingData) return;

    const editPath =
      meetingData.meetingType === 'OFFLINE'
        ? `/meeting/create/offline/${meetingId}`
        : `/meeting/create/delivery/${meetingId}`;

    navi(editPath);
  };

  const handleJoin = () => {
    console.log('참여하기 클릭');
    setIsModalOpen(true);
  };

  if (isLoading) {
    return <Loading />;
  }
  console.log('상세', meetingData);

  return (
    <Container>
      <Header
        title={meetingData?.meetingName || ' '}
        showBackButton={true}
        isJoin={meetingData?.isCurrentUser}
        onLeaveClick={handleLeave}
      />
      {meetingData && (
        <div>
          <MeetingDetailMain
            title={meetingData?.meetingName}
            description={meetingData?.meetingDescription}
            gender={meetingData?.genderRestriction}
            location={meetingData?.location}
            time={meetingData?.dueDateTime}
            lastChatAt={meetingData?.lastChatAt}
            isOwner={meetingData?.isOwner}
            chatRoomId={meetingData?.chatRoomId}
            meetingType={meetingData?.meetingType}
            backgroundImage={meetingData?.backgroundImage}
          />
          <ParticipantsList participants={meetingData?.participants || []} />
        </div>
      )}

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
        {meetingData?.isOwner ? (
          <Button size="sm" rounded="sm" onClick={handleEdit}>
            수정하기
          </Button>
        ) : (
          <Button size="sm" rounded="sm" onClick={handleJoin}>
            참여하기
          </Button>
        )}
      </ButtonContainer>
      {isModalOpen && meetingData?.chatRoomId && meetingId && (
        <MeetingGuidModal
          meetingType={meetingData?.meetingType}
          isCurrentUser={meetingData?.isCurrentUser}
          meetingId={meetingId}
          onClose={() => setIsModalOpen(false)}
        />
      )}
      <ToastMessage show={showToast}>모임링크가 복사되었어요!</ToastMessage>
    </Container>
  );
};

export default MeetingDetail;
