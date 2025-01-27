import ProfileIcon from '@/assets/images/ic_my_profile.svg';
import BottomNavigation from '@/components/common/BottomNavi';
import Button from '@/components/common/Button/Button';
import { mypageMenuItems } from '@/constants/mypageMenuConstants';
import {
  flexAlignCenter,
  flexCenter,
  flexColumn,
  flexColumnCenter,
} from '@/styles/CommonStyle';
import theme from '@/styles/theme';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const MyPageWrapper = styled.div``;

const TitleContainer = styled.div`
  padding: 20px 0 0 20px;
`;
const ProfileContainer = styled.div`
  ${flexAlignCenter}
  gap: 10px;
  padding: 20px;
`;

const MeetingItems = styled.div`
  ${flexColumnCenter}
  gap: 5px;
`;

const MeetingContainer = styled.div`
  ${flexCenter}
  flex-direction: row;
  gap: 70px;
  padding: 15px;
  margin-bottom: 10px;
  /* background-color: ${({ theme }) => theme.COLORS.gray[50]}; */
  background-color: #fcebcb;
  width: 100%;
`;
const TextContainer = styled.div`
  ${flexColumn}
  gap:5px;
`;

const Text = styled.div<{
  fontSize: keyof typeof theme.FONT_SIZE;
  fontWeight?: keyof typeof theme.FONT_WEIGHT;
  color?: 'gray';
}>`
  font-weight: ${({ theme, fontWeight = 'light' }) =>
    theme.FONT_WEIGHT[fontWeight]};
  font-size: ${({ theme, fontSize }) => theme.FONT_SIZE[fontSize]};
  color: ${({ theme, color }) =>
    color === 'gray' ? '#858585' : theme.COLORS.black};
`;

const MenuContainer = styled.div`
  padding: 20px 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 30px;
`;

const MenuItem = styled.div`
  ${flexAlignCenter}
  gap: 20px;
  cursor: pointer;

  img {
    width: 24px;
    height: 24px;
  }
`;

const SectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const Divider = styled.div`
  height: 1px;
  background-color: ${({ theme }) => theme.COLORS.gray[10]};
  margin: 10px 0;
`;

const mockData = {
  name: '가천',
  studentId: '가천대학교 202233333',
  create: 1,
  participation: 5,
};

const MyPage: React.FC = () => {
  const nav = useNavigate();
  return (
    <MyPageWrapper>
      <TitleContainer>
        <Text fontSize="xl" fontWeight="bold">
          마이페이지
        </Text>
      </TitleContainer>
      <ProfileContainer>
        <img src={ProfileIcon} alt="profile" />
        <TextContainer>
          <Text fontSize="md">{mockData.name}</Text>
          <Text fontSize="sm">{mockData.studentId}</Text>
        </TextContainer>
      </ProfileContainer>
      <MeetingContainer>
        <MeetingItems>
          <div>{mockData.create}</div>
          <Text fontSize="sm" color="gray">
            개설한 모임
          </Text>
        </MeetingItems>
        <MeetingItems>
          <div>{mockData.participation}</div>
          <Text fontSize="sm" color="gray">
            참여한 모임
          </Text>
        </MeetingItems>
      </MeetingContainer>
      <MenuContainer>
        {mypageMenuItems.map((section, index) => (
          <SectionContainer key={index}>
            <Text fontSize="sm" color="gray">
              {section.category}
            </Text>
            {section.items.map((item, idx) => (
              <MenuItem key={idx} onClick={() => nav(item.path)}>
                <img src={item.icon} alt={item.label} />
                <Text fontSize="md">{item.label}</Text>
              </MenuItem>
            ))}
            {index !== mypageMenuItems.length - 1 && <Divider />}
          </SectionContainer>
        ))}
      </MenuContainer>
      <Button variant="primary" size="lg" rounded="sm">
        로그아웃
      </Button>
      <BottomNavigation />
    </MyPageWrapper>
  );
};

export default MyPage;
