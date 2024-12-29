import mainLogo from '../../assets/images/EatMate_main_Logo.svg';
import Button from '../../components/common/Button/Button';
import GoogleIcon from '../../assets/images/GoogleIcon.svg';
import * as S from '../../styles/SignUp/IntroPage.styled';

const IntroPage: React.FC = () => {
  return (
    <S.Container>
      <S.ContentWrapper>
        <div>
          <img src={mainLogo} alt="eatMate-logo" />
        </div>
        <S.MainText>혼자보다 함께</S.MainText>
        <S.SubText>
          <div>혼밥도,혼술도,배달비도 걱정 끝!</div>
          <div>가천대생을 위한 안전하고 편리한 모임 시작해보세요.</div>
        </S.SubText>
      </S.ContentWrapper>
      <S.ButtonWrapper>
        <Button
          variant="primary-outline"
          size="lg"
          color="black"
          rounded="md"
          svgIcon
        >
          <img src={GoogleIcon} alt="google-icon" />
          Google로 가입
        </Button>
      </S.ButtonWrapper>
    </S.Container>
  );
};

export default IntroPage;
