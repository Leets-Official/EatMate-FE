import { useState, useEffect, useCallback, useMemo } from 'react';
import styled from 'styled-components';
import SortingButton from '@/components/common/SortingButton/SortingButton';
import MeetingListItem from '@/components/Home/MeetingListItem';
import FilterModal from '@/components/common/Modal/FilterModal';
import RangeSlider from '@/components/common/RangeSlider';
import { getOfflineMeetingApi } from '@/apis/meetings/getMeeting';
import DeliveryCategory from '@/components/Home/DeliveryCategory';
import NotFound from '@/pages/Not-found';
import { useNavigate } from 'react-router-dom';

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

const Divider = styled.div`
  width: 100%;
  height: 10px;
  background-color: #f9f9fc;
  margin: 10px 0;
`;

const MeetingList = ({ cover }: { cover: string }) => {
  const [isModalOpen, setIsModalOpen] = useState<string | null>(null);
  const [meetingData, setMeetingData] = useState([]);
  const [loading, setLoading] = useState(false);

  const [deliveryCategory, setDeliveryCategory] = useState('');

  const [sortOption, setSortOption] = useState('기본순');
  const [genderOption, setGenderOption] = useState('모든성별');
  const [participantOption, setParticipantOption] = useState('2인~10인');
  const [rangeLabel, setRangeLabel] = useState('2인~10인');

  const navigate = useNavigate();

  // params 객체 생성
  const params = useMemo(() => {
    const baseParams = { cover, sortOption, genderOption, rangeLabel };
    if (cover === 'delivery') {
      return { ...baseParams, deliveryCategory };
    }
    return baseParams;
  }, [cover, sortOption, genderOption, rangeLabel, deliveryCategory]);

  const fetchMeetings = useCallback(async () => {
    setLoading(true);
    try {
      const api = getOfflineMeetingApi();
      const meetings = await api.fetchMeetings(params);
      setMeetingData(meetings);
    } catch (error) {
      console.error('Error fetching meeting data:', error);
      return <NotFound />;
    } finally {
      setLoading(false);
    }
  }, [params]);

  // fetchMeetings 변경될 때만 실행
  useEffect(() => {
    fetchMeetings();
  }, [fetchMeetings]);

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

  const handleNavigateToDetail = (meetingId: number) => {
    navigate(`/meeting/${meetingId}`);
  };

  return (
    <Container>
      {cover === 'delivery' ? (
        <div>
          <DeliveryCategory onCategorySelect={setDeliveryCategory} />
          <Divider />
        </div>
      ) : null}
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
          <div> </div>
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
              onClick={() => handleNavigateToDetail(meeting.meetingId)}
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
