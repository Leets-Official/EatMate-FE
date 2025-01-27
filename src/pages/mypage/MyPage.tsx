import ProfileIcon from '@/assets/images/ic_my_profile.svg';
import BottomNavigation from '@/components/common/BottomNavi';
import Button from '@/components/common/Button/Button';
import { mypageMenuItems } from '@/constants/mypageMenuConstants';
import * as S from '@/styles/mypage/mypage.styled';
import { useNavigate } from 'react-router-dom';

const mockData = {
  name: '가천',
  studentId: '가천대학교 202233333',
  create: 1,
  participation: 5,
};

const MyPage: React.FC = () => {
  const nav = useNavigate();
  return (
    <div>
      <S.TitleContainer>
        <S.Text fontSize="xl" fontWeight="bold">
          마이페이지
        </S.Text>
      </S.TitleContainer>
      <S.ProfileContainer>
        <img src={ProfileIcon} alt="profile" />
        <S.TextContainer>
          <S.Text fontSize="md">{mockData.name}</S.Text>
          <S.Text fontSize="sm">{mockData.studentId}</S.Text>
        </S.TextContainer>
      </S.ProfileContainer>
      <S.MeetingContainer>
        <S.MeetingItems>
          <div>{mockData.create}</div>
          <S.Text fontSize="sm" color="gray">
            개설한 모임
          </S.Text>
        </S.MeetingItems>
        <S.MeetingItems>
          <div>{mockData.participation}</div>
          <S.Text fontSize="sm" color="gray">
            참여한 모임
          </S.Text>
        </S.MeetingItems>
      </S.MeetingContainer>
      <S.MenuContainer>
        {mypageMenuItems.map((section, index) => (
          <S.SectionContainer key={index}>
            <S.Text fontSize="sm" color="gray">
              {section.category}
            </S.Text>
            {section.items.map((item, idx) => (
              <S.MenuItem key={idx} onClick={() => nav(item.path)}>
                <img src={item.icon} alt={item.label} />
                <S.Text fontSize="md">{item.label}</S.Text>
              </S.MenuItem>
            ))}
            {index !== mypageMenuItems.length - 1 && <S.Divider />}
          </S.SectionContainer>
        ))}
      </S.MenuContainer>
      <S.ButtonContainer>
        <Button variant="primary" size="lg" rounded="sm">
          로그아웃
        </Button>
      </S.ButtonContainer>
      <BottomNavigation />
    </div>
  );
};

export default MyPage;
