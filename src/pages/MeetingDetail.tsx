import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Button from '@/components/common/Button/Button';
import Header from '@/components/common/Header/Header';
import MeetingDetailMain from '@/components/MeetingDetail/MeetingDetailMain';
import MailIcon from '@/assets/images/ic_invite_mail.svg';
import MeetingGuidModal from '@/components/common/Modal/MeetingGuideModal';
import { flexCenter } from '@/styles/CommonStyle';
import ParticipantsList from '@/components/MeetingDetail/ParticipantsList';
import defaultInstance from '@/apis/axiosInstance';
import { useParams } from 'react-router-dom';

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
interface MeetingData {
  title: string;
  meetingType: string;
  description: string;
  gender: string;
  location: string;
  placeName: string;
  time: string;
  chatTime: string;
  isOwner: boolean;
  participants: Participant[];
}

interface Participant {
  userId: number;
  name: string;
  isOwner: boolean;
  isCurrentUser: boolean;
}
const MeetingDetail = () => {
  const [meetingData, setMeetingData] = useState<MeetingData | null>(null);
  const [showToast, setShowToast] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { meetingId } = useParams();

  const fetchMeetingDetail = async () => {
    try {
      const response = await defaultInstance.get(`/api/meetings/${meetingId}`);
      setMeetingData(response.data);
    } catch (error) {
      console.error('Failed to fetch meeting details:', error);
      alert('모임 정보를 불러오는데 실패했습니다.');
    }
  };

  useEffect(() => {
    fetchMeetingDetail();
  }, []);

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
        title={meetingData?.title || ' '}
        showBackButton={true}
        onBackClick={() => console.log('뒤로가기 클릭')}
        isJoin={meetingData?.isOwner}
        onLeaveClick={handleLeave}
      />
      {meetingData && (
        <div>
          <MeetingDetailMain
            meetingType={meetingData?.meetingType}
            title={meetingData?.title}
            description={meetingData?.description}
            gender={meetingData?.gender}
            location={meetingData?.location}
            placeName={meetingData?.placeName}
            time={meetingData?.time}
            chatTime={meetingData?.chatTime}
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
        {meetingData?.isOwner && (
          <>
            <Button size="sm" rounded="sm">
              수정하기
            </Button>
          </>
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
