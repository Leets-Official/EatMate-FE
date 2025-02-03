import { useNavigate } from 'react-router-dom';
import MeetingListItem from '@/components/Home/MeetingListItem';
import calenderIcon from '@/assets/images/ic_mypage_calendar.svg';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

const InactiveMeetingWrapper = styled.div`
  opacity: 0.5;
  pointer-events: none;
  cursor: default;
`;

interface MeetingItemProps {
  meeting: any;
}

const MyMeetingItem: React.FC<MeetingItemProps> = ({ meeting }) => {
  const nav = useNavigate();
  const [remainingTime, setRemainingTime] = useState<string>('');

  const dueDate = dayjs(meeting.dueDateTime);
  const createdDate = dayjs(meeting.createdAt).format('YYYY년 M월 D일'); // 개설 날짜 변환
  const isExpired = dayjs().isAfter(dueDate); // 만료 여부 확인
  const isInactive = meeting.meetingStatus === 'INACTIVE';

  useEffect(() => {
    if (
      meeting.meetingType !== 'DELIVERY' ||
      meeting.meetingStatus !== 'ACTIVE'
    )
      return;

    const calculateRemainingTime = () => {
      const now = dayjs();
      const diff = dueDate.diff(now, 'second');

      if (diff > 0) {
        const hours = Math.floor(diff / 3600);
        const minutes = Math.floor((diff % 3600) / 60);
        const seconds = diff % 60;

        setRemainingTime(
          hours > 0
            ? `${hours}시간 ${minutes}분 남았어요`
            : `${minutes}분 ${seconds}초 남았어요`
        );
      }
    };

    calculateRemainingTime();
    const timer = setInterval(calculateRemainingTime, 1000);

    return () => clearInterval(timer);
  }, [meeting.dueDateTime]);

  // 모임 타입에 따른 Cover 이미지 설정
  const coverImage =
    meeting.meetingType === 'DELIVERY'
      ? 'delivery'
      : meeting.offlineMeetingCategory === 'MEAL'
        ? 'meal'
        : 'beer';

  // rightSection 설정
  let rightSection = '';
  let timeDisplay: string | JSX.Element = '';

  if (meeting.meetingStatus === 'INACTIVE') {
    rightSection =
      meeting.meetingType === 'DELIVERY'
        ? '배달팟'
        : meeting.offlineMeetingCategory === 'MEAL'
          ? '밥약'
          : '술약';
    timeDisplay = (
      <>
        <img
          src={calenderIcon}
          alt="캘린더 아이콘"
          style={{ marginRight: 5 }}
        />
        {createdDate}
      </>
    );
  } else {
    if (meeting.meetingType === 'DELIVERY') {
      rightSection = '배달팟';
      timeDisplay = remainingTime; // 남은 시간 표시
    } else if (
      meeting.offlineMeetingCategory === 'MEAL' ||
      meeting.offlineMeetingCategory === 'BEVERAGE'
    ) {
      rightSection =
        meeting.offlineMeetingCategory === 'MEAL' ? '밥약' : '술약';

      if (dueDate.isSame(dayjs(), 'day')) {
        timeDisplay = `오늘 ${dueDate.format('A h시 mm분')}`;
      } else if (dueDate.isSame(dayjs().add(1, 'day'), 'day')) {
        timeDisplay = `내일 ${dueDate.format('A h시 mm분')}`;
      } else {
        timeDisplay = dueDate.format('M월 D일 A h시 mm분');
      }
    }
  }

  return isInactive ? (
    <InactiveMeetingWrapper>
      <MeetingListItem
        key={meeting.id}
        cover={coverImage}
        title={meeting.meetingName}
        description={meeting.meetingDescription}
        location={meeting.location}
        participants={meeting.participantCount}
        maxParticipants={meeting.maxParticipants ?? 10}
        time={timeDisplay}
        onClick={!isExpired ? () => nav(`/meeting/${meeting.id}`) : undefined}
        rightSection={rightSection}
        isMyMeeting
      />
    </InactiveMeetingWrapper>
  ) : (
    <MeetingListItem
      key={meeting.id}
      cover={coverImage}
      title={meeting.meetingName}
      description={meeting.meetingDescription}
      location={meeting.location}
      participants={meeting.participantCount}
      maxParticipants={meeting.maxParticipants ?? 10}
      time={timeDisplay}
      onClick={!isExpired ? () => nav(`/meeting/${meeting.id}`) : undefined}
      rightSection={rightSection}
      isMyMeeting
    />
  );
};

export default MyMeetingItem;
