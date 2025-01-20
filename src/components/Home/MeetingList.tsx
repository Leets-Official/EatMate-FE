import { useState } from 'react';
import styled from 'styled-components';
import SortingButton from '../common/SortingButton/SortingButton';
import MeetingListItem from './MeetingListItem';
import FilterModal from '../common/Modal/FilterModal';
import RangeSlider from '../common/RangeSlider';

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
const meetingData = [
  {
    id: 0,
    title: '마라탕 맛나게 냠냠냠 (ง •̀_•́)ง 모임',
    description:
      '마라탕 레전드 찐맛집입니다. 맛도 좋고 정문 옆이라 자주 가는데 혼자가기 빠끔하고 카메라모드로 시켜먹고 싶어서 방 팝니다!',
    location: '마라탕집 인메이트점',
    participants: '8/10',
    time: '30',
    isSelected: true,
  },
  {
    id: 1,
    title: '삼겹살팟',
    description:
      '삼겹살 좋아하시는 분들 같이 먹어요! 먹으면서 대화도 나누고 싶으신 분들 환영이에요. 진짜 많이 먹을거라서 n분의1은 안할 수도 있어요',
    location: '서울삼겹살 가천대점',
    participants: '4/10',
    time: '2',
    isSelected: false,
  },
  {
    id: 2,
    title: '시험 끝! 축하 밥약 모임 🎉',
    description:
      '시험 끝났으니 스트레스 풀 겸 맛있는 밥 같이 먹어요! 스트레스도 날려버립시다!',
    location: '소쿠리소',
    participants: '6/10',
    time: '5',
    isSelected: false,
  },
];

const MeetingList = ({ cover }: { cover: string }) => {
  const [isModalOpen, setIsModalOpen] = useState<string | null>(null);

  // 각 필터별 선택 상태
  const [sortOption, setSortOption] = useState('기본순');
  const [genderOption, setGenderOption] = useState('모든성별');
  const [participantOption, setParticipantOption] = useState('인원수');

  const handleSortClick = (value: string) => {
    setIsModalOpen(value);
  };

  const handleModalClose = () => {
    setIsModalOpen(null);
  };

  const handleSelectSortOption = (value: string) => {
    if (isModalOpen === 'default') {
      setSortOption(value);
    } else if (isModalOpen === 'gender') {
      setGenderOption(value);
    } else if (isModalOpen === 'participant') {
      setParticipantOption(value);
    }
    handleModalClose();
  };

  return (
    <Container>
      <ButtonContainer>
        <SortingButton
          text={sortOption}
          iconType="upDown"
          onClick={() => handleSortClick('default')}
        />
        <SortingButton
          text={genderOption}
          iconType="downArrow"
          onClick={() => handleSortClick('gender')}
        />
        <SortingButton
          text={participantOption}
          iconType="downArrow"
          onClick={() => handleSortClick('participant')}
        />
      </ButtonContainer>

      <ListContainer>
        {meetingData.map((meeting) => (
          <MeetingListItem
            cover={cover}
            key={meeting.id}
            isSelected={meeting.isSelected}
            title={meeting.title}
            description={meeting.description}
            location={meeting.location}
            participants={meeting.participants}
            time={meeting.time}
          />
        ))}
      </ListContainer>

      {isModalOpen === 'default' && (
        <FilterModal
          isOpen={true}
          title="정렬"
          options={[
            { label: '기본순', value: '기본순' },
            { label: '최신 등록 순', value: '최신 등록 순' },
            { label: '모임시간 임박 순', value: '모임시간 임박 순' },
          ]}
          selectedOption={sortOption}
          onSelect={handleSelectSortOption}
          onClose={handleModalClose}
        />
      )}

      {isModalOpen === 'gender' && (
        <FilterModal
          isOpen={true}
          title="성별"
          options={[
            { label: '모든성별', value: '모든성별' },
            { label: '남자만', value: '남자만' },
            { label: '여자만', value: '여자만' },
          ]}
          selectedOption={genderOption}
          onSelect={handleSelectSortOption}
          onClose={handleModalClose}
        />
      )}

      {isModalOpen === 'participant' && (
        <FilterModal
          isOpen={true}
          title="인원수"
          options={[
            { label: '전체', value: '전체' },
            { label: '2~6명', value: '2~6명' },
            { label: '6명 이상', value: '6명 이상' },
          ]}
          selectedOption={participantOption}
          onSelect={handleSelectSortOption}
          onClose={handleModalClose}
        >
          <RangeSlider />
        </FilterModal>
      )}
    </Container>
  );
};

export default MeetingList;
