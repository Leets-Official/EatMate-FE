import styled from 'styled-components';
import theme from '../styles/theme';

const Container = styled.div`
  font-family: ${theme.font.pretendard};
`;
const Home = () => {
  return <Container>홈페이지 </Container>;
};

export default Home;
