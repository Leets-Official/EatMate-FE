import { useNavigate } from 'react-router-dom';
import MeetingListItem from '@/components/Home/MeetingListItem';
import MealCover from '@/assets/images/ic_meal_cover.svg';
import BeerCover from '@/assets/images/ic_beer_cover.svg';
import DeliveryCover from '@/assets/images/ic_delivery_cover.svg';
import dayjs from 'dayjs';

interface MeetingItemProps {
  meeting: any;
}

const MeetingItem: React.FC<MeetingItemProps> = ({ meeting }) => {
  const nav = useNavigate();

  // 현재 시간과 dueDateTime 비교하여 만료 여부 확인
  const isExpired = dayjs().isAfter(meeting.dueDateTime);
  const formattedDate = dayjs(meeting.dueDateTime).format('YYYY년 M월 D일');

  // rightSection 설정 (만료된 경우 개설일, 활성화된 경우 모임 타입 표시)
  let rightSection = '';
  let timeDisplay = '';

  if (isExpired) {
    rightSection = `${formattedDate} 개설`;
  } else {
    if (meeting.meetingType === 'DELIVERY') {
      rightSection = '배달팟';
      timeDisplay = meeting.dueDateTime; // 남은 시간 표시
    } else if (meeting.meetingType === 'MEAL') {
      rightSection = '밥약';
      timeDisplay = formattedDate;
    } else if (meeting.meetingType === 'BEVERAGE') {
      rightSection = '술약';
      timeDisplay = formattedDate;
    }
  }

  // 모임 타입에 따른 cover 이미지 설정
  const coverImage =
    meeting.meetingType === 'MEAL'
      ? MealCover
      : meeting.meetingType === 'BEVERAGE'
        ? BeerCover
        : DeliveryCover;

  return (
    <MeetingListItem
      key={meeting.id}
      cover={coverImage}
      title={meeting.meetingName}
      description={meeting.description}
      location={meeting.location}
      participants={meeting.participantCount}
      maxParticipants={meeting.maxParticipants}
      time={timeDisplay}
      onClick={!isExpired ? () => nav(`/meeting/${meeting.id}`) : undefined}
      rightSection={rightSection}
    />
  );
};

export default MeetingItem;
