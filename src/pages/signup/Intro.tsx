import Button from '@/components/common/Button/Button';
import GoogleIcon from '@/assets/images/GoogleIcon.svg';
import * as S from '@/styles/SignUp/IntroPage.styled';
import { ButtonContainer } from '@/styles/SignUp/SignUp.styled';
import ProfileIcon1 from '@/assets/images/ic_participant1.svg';
import ProfileIcon2 from '@/assets/images/ic_participant2.svg';
import ProfileIcon3 from '@/assets/images/ic_participant3.svg';
import ProfileIcon4 from '@/assets/images/ic_participant4.svg';

const profileIcons = [
  { id: 1, icon: ProfileIcon1, alt: 'profile-1' },
  { id: 2, icon: ProfileIcon2, alt: 'profile-2' },
  { id: 3, icon: ProfileIcon3, alt: 'profile-3' },
  { id: 4, icon: ProfileIcon4, alt: 'profile-4' },
];

const onClickToLogin = () => {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const googleOAuthUrl = `${baseUrl}/oauth2/authorization/google`;
  window.location.href = googleOAuthUrl;
};

const Intro: React.FC = () => {
  return (
    <div>
      <S.ContentWrapper>
        <S.SubText>가천대학교 학생 누구든</S.SubText>
        <S.MainText>맛있는 만남, </S.MainText>
        <S.MainText>
          따뜻한 <S.MainText color="main">약속</S.MainText>
        </S.MainText>
      </S.ContentWrapper>

      <S.ProfileIconsWrapper>
        {profileIcons.map(({ id, icon, alt }) => (
          <S.ProfileIcon key={id} src={icon} alt={alt} />
        ))}
      </S.ProfileIconsWrapper>

      <ButtonContainer>
        <Button
          variant="primary-outline"
          size="lg"
          color="black"
          rounded="md"
          svgIcon
          onClick={onClickToLogin}
        >
          <S.Icon src={GoogleIcon} alt="google-icon" />
          Google로 시작하기
        </Button>
      </ButtonContainer>
    </div>
  );
};

export default Intro;
