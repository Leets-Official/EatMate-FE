import styled from 'styled-components';
import BeverageIcon from '@/assets/images/ic_beverage.svg';
import MealIcon from '@/assets/images/ic_meal.svg';
import DeliveryIcon from '@/assets/images/ic_delivery.svg';
import LocoIcon from '@/assets/images/EatMate_main_Logo.svg';
import { formatTimeWithMeridiem } from '@/utils/dateUtils';
import { flexColumn, flexColumnCenter } from '@/styles/CommonStyle';
import MyMeetingItem from '@/components/mypage/MyMeetingItem';
import { useEffect, useState } from 'react';
import {
  getMyMeetingParams,
  getMyParticipatingApi,
} from '@/apis/meetings/getMyMeeting';
import Loading from '@/components/common/Loading';
import FloatingPostButton from '@/components/common/FloatingPostButton';
import BottomNavigation from '@/components/common/BottomNavi';

const Container = styled.div`
  margin: 0 auto;
  max-width: 390px;
  position: relative;
  background-color: #fdeed3;
`;

const Banner = styled.div`
  padding: 20px;
  text-align: center;
  ${flexColumn}
  align-items: center;
`;

const LogoContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-self: flex-start;
`;

const Logo = styled.img`
  width: 72px;
  height: 28px;
`;

const BannerImage = styled.img`
  width: 100px;
  height: auto;
`;

const BannerTitle = styled.div`
  font-size: 24px;
  margin-top: 10px;
  font-weight: bold;
`;

const Description = styled.div`
  color: #636363;
  font-size: ${({ theme }) => theme.FONT_SIZE.smMd};
  margin-top: 10px;
  word-wrap: break-word;
  white-space: normal;
`;

const ListTitle = styled.div`
  font-size: ${({ theme }) => theme.FONT_SIZE.md};
  margin: 10px 0 0 25px;
  align-self: start;
`;

const BadgeContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  margin-top: 10px;
`;

const Badge = styled.div`
  background-color: ${({ theme }) => theme.COLORS.white};
  color: #f3aa24;
  font-size: ${({ theme }) => theme.FONT_SIZE.sm};
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.light};
  padding: 3px 8px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  white-space: nowrap;
  z-index: 10;
`;

const MeetingList = styled.div`
  background-color: ${({ theme }) => theme.COLORS.white};
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  ${flexColumnCenter}
  gap: 20px;
  padding: 20px 10px 10px 10px;
`;
const mockData = {
  meetingType: 'delivery',
  id: 1,
  meetingName: '칵테일 마시기',
  meetingStatus: 'ACTIVE',
  maxParticipants: 10,
  offlineMeetingCategory: 'BEVERAGE',
  createdAt: '2025-02-03T16:02:30.622Z',
  location: '가천 칵테일 바',
  dueDateTime: '2025-02-03T18:20:00.000Z',
  participantCount: 3,
  isOwn: true,
};

const ParticipatingMeeting = () => {
  const getMeetingDetails = () => {
    const category = mockData.offlineMeetingCategory;
    let badge = '';
    let iconSrc = '';

    switch (mockData.meetingType) {
      case 'delivery':
        badge = '배달팟';
        iconSrc = DeliveryIcon;
        break;
      case 'offline':
        if (category === 'MEAL') {
          badge = '밥약';
          iconSrc = MealIcon;
        } else if (category === 'BEVERAGE') {
          badge = '술약';
          iconSrc = BeverageIcon;
        }
        break;
      default:
        iconSrc = '';
        break;
    }

    return { badge, iconSrc };
  };

  const { badge, iconSrc } = getMeetingDetails();
  const [meetings, setMeetings] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [params, setParams] = useState<getMyMeetingParams>({
    lastMeetingId: undefined,
    lastDateTime: undefined,
    pageSize: 20,
  });

  useEffect(() => {
    const fetchMeeting = async () => {
      try {
        const data = await getMyParticipatingApi(params);
        console.log('내가 생성한 모임 데이터:', data);

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

    fetchMeeting();
  }, []);

  if (isLoading) return <Loading />;

  return (
    <Container>
      <Banner>
        <LogoContainer>
          <Logo src={LocoIcon} alt="로고" />
        </LogoContainer>
        <BannerImage src={iconSrc} alt={`${badge} 이미지`} />
        <BadgeContainer>
          {mockData.isOwn && <Badge>내가 주최한 모임</Badge>}
          {badge && <Badge>{badge}</Badge>}
        </BadgeContainer>
        <BannerTitle>안녕하세요 00님</BannerTitle>
        <Description>
          {`${formatTimeWithMeridiem(mockData.dueDateTime)}`}에{' '}
          {`${mockData.location}`}에서 <br />
          {`${mockData.meetingName}`} 약속이 있어요
        </Description>
      </Banner>
      <MeetingList>
        <ListTitle>참여 중인 모임</ListTitle>
        {meetings.map((meeting) => (
          <MyMeetingItem key={meeting.id} meeting={meeting} />
        ))}
      </MeetingList>
      <FloatingPostButton />
      <BottomNavigation />
    </Container>
  );
};

export default ParticipatingMeeting;
