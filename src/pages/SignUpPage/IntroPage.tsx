import styled from 'styled-components';
import mainLogo from '../../assets/images/EatMate_main_Logo.svg';
import Button from '../../components/common/Button/Button';
import GoogleIcon from '../../assets/images/GoogleIcon.svg';

export const Container = styled.div`
  min-height: 100vh;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const MainText = styled.div`
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.bold};
  font-size: 24px;
  margin-top: 120px;
  flex: 1;
`;

const SubText = styled.div`
  font-size: 14px;
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.semibold};
  margin-top: 15px;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ButtonWrapper = styled.div`
  position: absolute;
  bottom: 20px;
  padding: 20px;
  width: 100%;
  display: flex;
  justify-content: center;
`;

const IntroPage: React.FC = () => {
  return (
    <Container>
      <ContentWrapper>
        <div>
          <img src={mainLogo} alt="eatMate-logo" />
        </div>
        <MainText>혼자보다 함께</MainText>
        <SubText>
          <div>혼밥도,혼술도,배달비도 걱정 끝!</div>
          <div>가천대생을 위한 안전하고 편리한 모임 시작해보세요.</div>
        </SubText>
      </ContentWrapper>
      <ButtonWrapper>
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
      </ButtonWrapper>
    </Container>
  );
};

export default IntroPage;
