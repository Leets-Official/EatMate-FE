import MeetingListItem from '@/components/Home/MeetingListItem';
import styled from 'styled-components';

const Container = styled.div``;

const Home = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* 선택된 상태 */}
      <MeetingListItem
        isSelected={true}
        title="마라탕 맛나게 냠냠냠 (ง •̀_•́)ง 모임"
        description="마라탕 레전드 찐맛집입니다. 맛도 좋고 정문 옆이라 자주 가는데 혼자가기 빠끔해서 방 팝니다!"
        location="마라탕집 맛있겠어요점"
        participants="8/10"
        time="30분 전 대화"
      />

      {/* 기본 상태 */}
      <MeetingListItem
        isSelected={false}
        title="삼겹살팟"
        description="같이 삼겹살 먹어요."
        location="서울삼겹살 가천대점"
        participants="6/10"
        time="30분 전 대화"
      />
    </div>
  );
};

export default Home;
