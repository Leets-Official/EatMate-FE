import Button from '@/components/common/Button/Button';
import Header from '@/components/common/Header/Header';
import MeetingDetailMain from '@/components/MeetingDetail/MeetingDetailMain';
import styled from 'styled-components';
import MailIcon from '@/assets/images/ic_invite_mail.svg';

const Container = styled.div`
  margin: 0 auto;
  max-width: 390px;
  position: relative;
  padding-top: 25px;
  justify-content: center;
  overflow: hidden;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 21px;
  margin: 90px auto;
  justify-content: center;
  align-items: center;
`;
const Icon = styled.img`
  width: 24px;
  height: 24px;
  display: block;
`;

const meetingMockData = {
  title: '마라탕 맛나게 냠냠냠 ٩( ᐛ )و 모임',
  description: `마라탕 레전드 찐맛집입니다.
  맛도 좋고 정문 옆이라 자주 가는데 혼자 가기 뻘쭘해서 방 팝니다!`,
  gender: '여자만',
  location: '마라탕집',
  placeName: '맛있겠어요점',
  time: '오후 6시 10분',
  chatTime: '30분',
};

interface MeetingDetailProps {
  isOwner: boolean; // 게시물 소유 여부를 판별할 prop 추가
}

const MeetingDetail = ({ isOwner }: MeetingDetailProps) => {
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
        title={meetingMockData.title}
        description={meetingMockData.description}
        gender={meetingMockData.gender}
        location={meetingMockData.location}
        placeName={meetingMockData.placeName}
        time={meetingMockData.time}
        chatTime={meetingMockData.chatTime}
      />
      <ButtonContainer>
        <Button variant="primary-outline" size="sm" rounded="sm">
          <Icon src={MailIcon} alt="초대" />
          초대하기
        </Button>
        {isOwner ? (
          <>
            <Button size="sm" rounded="sm">
              수정하기
            </Button>
          </>
        ) : (
          <Button size="sm" rounded="sm">
            참여하기
          </Button>
        )}
      </ButtonContainer>
    </Container>
  );
};

export default MeetingDetail;
