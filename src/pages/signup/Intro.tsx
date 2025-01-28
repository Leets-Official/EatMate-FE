import Button from '@/components/common/Button/Button';
import GoogleIcon from '@/assets/images/GoogleIcon.svg';
import * as S from '@/styles/SignUp/IntroPage.styled';

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

      <S.ButtonWrapper>
        <Button
          variant="primary-outline"
          size="lg"
          color="black"
          rounded="md"
          svgIcon
          onClick={onClickToLogin}
        >
          <img src={GoogleIcon} alt="google-icon" />
          Google로 시작하기
        </Button>
      </S.ButtonWrapper>
    </div>
  );
};

export default Intro;
