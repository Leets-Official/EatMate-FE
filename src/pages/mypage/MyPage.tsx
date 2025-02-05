import ProfileIcon from '@/assets/images/ic_my_profile.svg';
import BottomNavigation from '@/components/common/BottomNavi';
import Button from '@/components/common/Button/Button';
import { mypageMenuItems } from '@/constants/mypageMenuConstants';
import * as S from '@/styles/mypage/mypage.styled';
import { useNavigate } from 'react-router-dom';
import editIcon from '@/assets/images/ic_edit_profile.svg';
import { useEffect, useState } from 'react';
import { getProfileInfo } from '@/apis/profile/getProfile';
import Loading from '@/components/common/Loading';
import TimePicker from '@/components/event/TimePickerTest';

const MyPage: React.FC = () => {
  const nav = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  const [profileData, setProfileData] = useState<{
    nickname: string;
    studentNumber: string;
    profileImg: string;
  }>({
    nickname: '',
    studentNumber: '',
    profileImg: ProfileIcon,
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getProfileInfo();
        console.log('받아온 유저 데이터: ', data);
        setProfileData({
          nickname: data.nickname || '닉네임 없음',
          studentNumber: data.studentNumber?.toString() || '학번 없음',
          profileImg: data.profileImageUrl || ProfileIcon,
        });
      } catch (error) {
        console.error('프로필 정보를 불러오는 중 오류 발생:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <S.TitleContainer>
        <S.Text fontSize="xl" fontWeight="bold">
          마이페이지
        </S.Text>
      </S.TitleContainer>
      <S.ProfileContainer>
        <S.ProfileWrapper onClick={() => nav('/mypage/profile')}>
          <S.ProfileImage src={profileData.profileImg} alt="profile" />
          <S.EditIcon src={editIcon} alt="edit" />
        </S.ProfileWrapper>
        <S.TextContainer>
          <S.Text fontSize="lg">{profileData.nickname}</S.Text>
          <S.Text fontSize="sm">가천대학교 {profileData.studentNumber}</S.Text>
        </S.TextContainer>
      </S.ProfileContainer>
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
        <Button
          variant="primary"
          size="lg"
          rounded="sm"
          onClick={() => nav('/intro')}
        >
          로그아웃
        </Button>
      </S.ButtonContainer>
      <BottomNavigation />
    </div>
  );
};

export default MyPage;
