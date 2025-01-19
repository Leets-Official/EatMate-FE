import { useState } from 'react';
import styled from 'styled-components';
import SortingButton from '../common/SortingButton/SortingButton';
import MeetingListItem from './MeetingListItem';

const Container = styled.div`
  padding: 16px;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  margin-bottom: 20px;
  margin-left: 12px;
`;

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;
`;

const MeetingList = ({ cover }: { cover: string }) => {
  const [selectedSort, setSelectedSort] = useState(0);

  const handleSortClick = (index: number) => {
    setSelectedSort(index);
  };

  const sortButtons: { text: string; iconType: 'upDown' | 'downArrow' }[] = [
    { text: '기본순', iconType: 'upDown' },
    { text: '성별', iconType: 'downArrow' },
    { text: '인원수', iconType: 'downArrow' },
  ];

  const meetingData = [
    {
      title: '마라탕 맛나게 냠냠냠 (ง •̀_•́)ง 모임',
      description:
        '마라탕 레전드 찐맛집입니다. 맛도 좋고 정문 옆이라 자주 가는데 혼자가기 빠끔하고 카메라모드로 시켜먹고 싶어서 방 팝니다!',
      location: '마라탕집 인메이트점',
      participants: '8/10',
      time: '30',
      isSelected: true,
    },
    {
      title: '삼겹살팟',
      description:
        '삼겹살 좋아하시는 분들 같이 먹어요! 먹으면서 대화도 나누고 싶으신 분들 환영이에요. 진짜 많이 먹을거라서 n분의1은 안할 수도 있어요',
      location: '서울삼겹살 가천대점',
      participants: '4/10',
      time: '2',
      isSelected: false,
    },
    {
      title: '시험 끝! 축하 밥약 모임 🎉',
      description:
        '시험 끝났으니 스트레스 풀 겸 맛있는 밥 같이 먹어요! 스트레스도 날려버립시다!',
      location: '소쿠리소',
      participants: '6/10',
      time: '5',
      isSelected: false,
    },
  ];

  return (
    <Container>
      <ButtonContainer>
        {sortButtons.map((button, index) => (
          <SortingButton
            key={index}
            isSelected={selectedSort === index}
            text={button.text}
            iconType={button.iconType}
            onClick={() => handleSortClick(index)}
          />
        ))}
      </ButtonContainer>

      <ListContainer>
        {meetingData.map((meeting, index) => (
          <MeetingListItem
            cover={cover}
            key={index}
            isSelected={meeting.isSelected}
            title={meeting.title}
            description={meeting.description}
            location={meeting.location}
            participants={meeting.participants}
            time={meeting.time}
          />
        ))}
      </ListContainer>
    </Container>
  );
};

export default MeetingList;
