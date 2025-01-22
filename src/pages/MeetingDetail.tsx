import Button from '@/components/common/Button/Button';
import Header from '@/components/Header/Header';
import styled from 'styled-components';

const Container = styled.div`
  margin: 0 auto;
  max-width: 390px;
  position: relative;
  padding-top: 25px;
  justify-content: center;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 21px;
  margin: 10px auto;
  justify-content: center;
  align-items: center;
`;

const MeetingDetail = () => {
  const handleLeave = () => {
    alert('모임에서 나갔습니다.');
  };

  return (
    <Container>
      <Header
        title="모임 상세"
        showBackButton={true}
        onBackClick={() => console.log('뒤로가기 클릭')}
        isJoin={true}
        onLeaveClick={handleLeave}
      />
      <ButtonContainer>
        <Button variant="primary-outline" size="sm" rounded="sm">
          초대하기
        </Button>
        <Button size="sm" rounded="sm">
          수정하기
        </Button>
      </ButtonContainer>
    </Container>
  );
};

export default MeetingDetail;
