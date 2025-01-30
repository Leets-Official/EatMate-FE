import NotFoundLottie from '@/assets/lotties/404Lottie.json';
import { LottieContainer } from './signup/SignupSuccess';
import Lottie from 'lottie-react';
import Button from '@/components/common/Button/Button';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { flexCenter } from '@/styles/CommonStyle';

export const RowButton = styled.div`
  ${flexCenter}
  gap: 20px;
`;

const NotFound: React.FC = () => {
  const nav = useNavigate();
  return (
    <LottieContainer>
      <Lottie
        animationData={NotFoundLottie}
        loop={true}
        style={{ width: 300, height: 300 }}
      />
      <RowButton>
        <Button variant="primary" size="xs" onClick={() => nav(-1)}>
          이전 페이지
        </Button>
        <Button
          variant="primary-outline"
          size="xs"
          onClick={() => nav('/home')}
        >
          홈으로 이동
        </Button>
      </RowButton>
    </LottieContainer>
  );
};

export default NotFound;
