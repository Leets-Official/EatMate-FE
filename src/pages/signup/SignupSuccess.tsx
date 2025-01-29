import React, { useEffect } from 'react';
import Lottie from 'lottie-react';
import successLottie from '@/assets/lotties/successLottie.json';
import styled from 'styled-components';
import { flexColumnCenter } from '@/styles/CommonStyle';
import { Text } from '@/styles/mypage/mypage.styled';
import { useNavigate } from 'react-router-dom';

export const LottieContainer = styled.div`
  ${flexColumnCenter}
  gap: 50px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
const SignupSuccess: React.FC = () => {
  const nav = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      nav('/home');
    }, 1500);

    return () => clearTimeout(timer);
  }, [nav]);

  return (
    <LottieContainer>
      <Lottie
        animationData={successLottie}
        loop={true}
        style={{ width: 180, height: 180 }}
      />
      <Text fontSize="lg">이제 시작해볼까요?</Text>
    </LottieContainer>
  );
};

export default SignupSuccess;
