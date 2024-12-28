import styled from 'styled-components';
import mainLogo from '../../assets/images/EatMate_main_Logo.svg';

export const Container = styled.div`
  min-height: 100vh;
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
`;

const SubText = styled.div`
  font-size: 14px;
  margin-top: 15px;
`;

const IntroPage: React.FC = () => {
  return (
    <Container>
      <div>
        <img src={mainLogo} alt="eatMate-logo" />
      </div>
      <MainText>혼자보다 함께</MainText>
      <SubText>
        <div>혼밥도,혼술도,배달비도 걱정 끝!</div>
        <div>가천대생을 위한 안전하고 편리한 모임 시작해보세요.</div>
      </SubText>
    </Container>
  );
};
export default IntroPage;
