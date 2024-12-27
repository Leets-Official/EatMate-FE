import styled from 'styled-components';
import mainLogo from '../../assets/images/EatMate_main_Logo.svg';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const IntroPage: React.FC = () => {
  return (
    <Container>
      <img src={mainLogo} alt="eatMate-logo" />
      <div>혼자보다 함께</div>
      <div>혼밥도,혼술도,배달비도 걱정 끝! </div>
      <div>가천대생을 위한 안전하고 편리한 모임 시작해보세요.</div>
    </Container>
  );
};
export default IntroPage;
