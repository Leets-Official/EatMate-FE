import { useState, useEffect } from 'react';
import styled from 'styled-components';
import SortingButton from '@/components/common/SortingButton/SortingButton';
import MeetingListItem from '@/components/Home/MeetingListItem';
import FilterModal from '@/components/common/Modal/FilterModal';
import RangeSlider from '@/components/common/RangeSlider';
import { getOfflineMeetingApi } from '@/apis/meetings/getMeeting';

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
  padding-bottom: 80px;
`;

const MeetingList = ({ cover }: { cover: string }) => {
  const [isModalOpen, setIsModalOpen] = useState<string | null>(null);
  const [meetingData, setMeetingData] = useState([]);
  const [loading, setLoading] = useState(false);

  const [sortOption, setSortOption] = useState('기본순');
  const [genderOption, setGenderOption] = useState('모든성별');
  const [participantOption, setParticipantOption] = useState('2인~10인');
  const [rangeLabel, setRangeLabel] = useState('2인~10인');

  useEffect(() => {
    const fetchMeetings = async () => {
      setLoading(true);
      try {
        if (cover === 'meal' || cover === 'beer') {
          // 오프라인 모임임
          const api = getOfflineMeetingApi();
          const meetings = await api.fetchMeetings({
            cover,
            sortOption,
            genderOption,
            rangeLabel,
          });
          setMeetingData(meetings);
        } else if (cover === 'delivery') {
          // 여기에 delivery 관련 API 호출 로직을 추가하세요.
          // 예: const deliveryMeetings = await fetchDeliveryMeetings();
          // setMeetingData(deliveryMeetings);
        }
      } catch (error) {
        console.error('Error fetching meeting data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMeetings();
  }, [cover, sortOption, genderOption, rangeLabel]);

  const handleModalClose = () => setIsModalOpen(null);
  const handleSelectSortOption = (value: string) => {
    if (isModalOpen === 'default') setSortOption(value);
    if (isModalOpen === 'gender') setGenderOption(value);
    handleModalClose();
  };
  const handleParticipantConfirm = () => {
    setParticipantOption(rangeLabel);
    handleModalClose();
  };

  return (
    <Container>
      <ButtonContainer>
        <SortingButton
          text={sortOption}
          iconType="upDown"
          isSelected={sortOption !== '기본순'}
          onClick={() => setIsModalOpen('default')}
        />
        <SortingButton
          text={genderOption}
          iconType="downArrow"
          isSelected={genderOption !== '모든성별'}
          onClick={() => setIsModalOpen('gender')}
        />
        <SortingButton
          text={participantOption}
          iconType="downArrow"
          isSelected={participantOption !== '2인~10인'}
          onClick={() => setIsModalOpen('participant')}
        />
      </ButtonContainer>

      <ListContainer>
        {loading ? (
          <p>Loading...</p>
        ) : (
          meetingData.map((meeting: any) => (
            <MeetingListItem
              cover={cover}
              key={meeting.meetingId}
              isSelected={false}
              title={meeting.meetingName}
              description={meeting.meetingDescription}
              location={meeting.location}
              participants={meeting.currentParticipantCount}
              maxParticipants={meeting.maxParticipants}
              time={meeting.dueDateTime}
              deliveryTime={meeting.dueDateTime}
            />
          ))
        )}
      </ListContainer>

      {isModalOpen === 'default' && (
        <FilterModal
          isOpen
          title="정렬"
          options={[
            { label: '기본순', value: '기본순' },
            { label: '최신등록순', value: '최신등록순' },
            { label: '모임임박순', value: '모임임박순' },
          ]}
          selectedOption={sortOption}
          onSelect={handleSelectSortOption}
          onClose={handleModalClose}
        />
      )}

      {isModalOpen === 'gender' && (
        <FilterModal
          isOpen
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
          isOpen
          title="인원수"
          options={[]}
          selectedOption=""
          onSelect={() => {}}
          onClose={handleParticipantConfirm}
        >
          <RangeSlider isCheck={false} onLabelChange={setRangeLabel} />
        </FilterModal>
      )}
    </Container>
  );
};

export default MeetingList;
