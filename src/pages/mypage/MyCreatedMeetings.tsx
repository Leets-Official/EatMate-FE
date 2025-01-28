import Header from '@/components/common/Header/Header';
// import MeetingListItem from '@/components/Home/MeetingListItem';
import { flexColumn } from '@/styles/CommonStyle';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

// const CreatedMeetingData = [
//   {
//     id: 0,
//     title: '마라탕 맛나게 냠냠냠 (ง •̀_•́)ง 모임',
//     description:
//       '마라탕 레전드 찐맛집입니다. 맛도 좋고 정문 옆이라 자주 가는데 혼자가기 빠끔하고 카메라모드로 시켜먹고 싶어서 방 팝니다!',
//     location: '마라탕집 인메이트점',
//     participants: '8/10',
//     time: '배달팟',
//   },
//   {
//     id: 1,
//     title: '피자 주문합니다.',
//     description: '같이 주문해요.',
//     location: '도미노 피자 가천대점',
//     participants: '4/10',
//     time: '배달팟',
//   },
//   {
//     id: 2,
//     title: '시험 끝! 축하 밥약 모임 🎉',
//     description:
//       '시험 끝났으니 스트레스 풀 겸 맛있는 밥 같이 먹어요! 스트레스도 날려버립시다!',
//     location: '소쿠리소',
//     participants: '6/10',
//     deliveryTime: '23분 20초',
//     time: '배달팟',
//   },
// ];

export const ItemContainer = styled.div`
  ${flexColumn}
  gap: 20px;
  padding: 10px;
`;

const MyCreatedMeetings: React.FC = () => {
  const nav = useNavigate();
  return (
    <div>
      <Header
        onBackClick={() => nav(-1)}
        showBackButton
        title="내가 생성한 모임"
      />
      <ItemContainer>
        {/* {CreatedMeetingData.map((created) => (
          <MeetingListItem
            //   cover={cover}
            key={created.id}
            title={created.title}
            description={created.description}
            location={created.location}
            participants={created.participants}
            time={created.time}
            deliveryTime={created.deliveryTime}
          />
        ))} */}
      </ItemContainer>
    </div>
  );
};

export default MyCreatedMeetings;
