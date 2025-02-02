import Header from '@/components/common/Header/Header';
import { useNavigate } from 'react-router-dom';
import { ItemContainer } from './MyCreatedMeetings';
import {
  getMyMeetingParams,
  getMyParticipatedApi,
} from '@/apis/meetings/getMyMeeting';
import { useEffect, useState } from 'react';
import Loading from '@/components/common/Loading';
import MyMeetingItem from '@/components/mypage/MyMeetingItem';

const MyParticipatedMeetings: React.FC = () => {
  const nav = useNavigate();

  const [isLoading, setIsLoading] = useState(true);
  const [meetings, setMeetings] = useState<any[]>([]);
  const [params, setParams] = useState<getMyMeetingParams>({
    lastMeetingId: undefined,
    lastDateTime: undefined,
    pageSize: 20,
  });

  useEffect(() => {
    const fetchMeetings = async () => {
      try {
        const data = await getMyParticipatedApi(params);
        console.log('내가 참여한 모임 데이터: ', data);

        setMeetings((prev) => {
          const newMeetings = data.content.filter(
            (meeting: { id: any }) =>
              !prev.some((prevMeeting) => prevMeeting.id === meeting.id)
          );
          return [...prev, ...newMeetings];
        });

        if (data.cursorInfo) {
          setParams({
            lastMeetingId: data.cursorInfo.meetingId,
            lastDateTime: data.cursorInfo.lastMeetingTime,
            pageSize: 20,
          });
        }
      } catch (error) {
        error instanceof Error
          ? error.message
          : '내가 생성한 모임 데이터를 불러오는 중 오류 발생:';
      } finally {
        setIsLoading(false);
      }
    };

    fetchMeetings();
  }, []);

  if (isLoading) {
    return <Loading />;
  }
  return (
    <div>
      <Header
        onBackClick={() => nav(-1)}
        showBackButton
        title="내가 참여한 모임"
      />
      <ItemContainer>
        {meetings.map((meeting) => (
          <MyMeetingItem key={meeting.id} meeting={meeting} />
        ))}
      </ItemContainer>
    </div>
  );
};

export default MyParticipatedMeetings;
