import {
  flexAlignCenter,
  flexColumn,
  flexColumnCenter,
} from '@/styles/CommonStyle';
import { MeetingItems } from '@/styles/mypage/mypage.styled';
import styled from 'styled-components';
import BeverageIcon from '@/assets/images/ic_beverage.svg';
import MealIcon from '@/assets/images/ic_meal.svg';
import DeliveryIcon from '@/assets/images/ic_delivery.svg';
import LocoIcon from '@/assets/images/EatMate_main_Logo.svg';
const Container = styled.div`
  margin: 0 auto;
  max-width: 390px;
  position: relative;
  padding-top: 25px;
  background-color: #fdeed3;
`;

// 배너 스타일
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
  font-size: ${({ theme }) => theme.FONT_SIZE.lg};
  margin-top: 10px;
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.bold};
`;
const Description = styled.div`
  color: #636363;
  font-size: ${({ theme }) => theme.FONT_SIZE.sm};
  margin-top: 10px;
  word-wrap: break-word;
  white-space: normal;
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
  ${flexAlignCenter}
  white-space: nowrap;
  z-index: 10;
`;

// 참가 모임 스타일
const ParticipatingMeetingList = styled.div`
  background-color: ${({ theme }) => theme.COLORS.white};
  border-top-left-radius: 25px;
  border-top-right-radius: 25px;
  ${flexColumnCenter}
  gap: 20px;
`;

const ParticipatingMeeting = () => {
  return (
    <Container>
      <Banner>
        <LogoContainer>
          <Logo src={LocoIcon} alt="로고" />
        </LogoContainer>
        <BannerImage src={BeverageIcon} alt="맥주 잔" />
        <BadgeContainer>
          <Badge>내가 주최한 모임</Badge>
          <Badge>술약</Badge>
        </BadgeContainer>

        <BannerTitle>안녕하세요 가천님</BannerTitle>
        <Description>
          오후 6시 10분에 마라탕집 맛있겠어요점에서
          <br /> 마라탕 맛나게 냠냠냠 ٩( ᐛ )و 모임 약속이 있어요
        </Description>
      </Banner>
      <ParticipatingMeetingList>
        <MeetingItems>dd</MeetingItems>
      </ParticipatingMeetingList>
    </Container>
  );
};

export default ParticipatingMeeting;
