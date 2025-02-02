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
import Lottie from 'lottie-react';
import BeerLottie from '@/assets/lotties/BeerLottie.json';
import { flexColumnCenter } from '@/styles/CommonStyle';
import styled from 'styled-components';

export const EmptyStateContainer = styled.div`
  ${flexColumnCenter}
  gap: 20px;
  height: 60vh;
  text-align: center;
  font-size: ${({ theme }) => theme.FONT_SIZE.lg};
  color: ${({ theme }) => theme.COLORS.gray[300]};
`;

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
      {meetings.length === 0 ? (
        <EmptyStateContainer>
          <Lottie
            animationData={BeerLottie}
            loop={true}
            style={{ width: 200, height: 200 }}
          />
          <div>참여한 모임이 없습니다!</div>
        </EmptyStateContainer>
      ) : (
        <ItemContainer>
          {meetings.map((meeting) => (
            <MyMeetingItem key={meeting.id} meeting={meeting} />
          ))}
        </ItemContainer>
      )}
    </div>
  );
};

export default MyParticipatedMeetings;
