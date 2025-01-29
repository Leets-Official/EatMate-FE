import LoadingLottie from '@/assets/lotties/loadingLottie.json';
import Lottie from 'lottie-react';
import { LottieContainer } from './signup/SignupSuccess';

const Loading: React.FC = () => {
  return (
    <LottieContainer>
      <Lottie
        animationData={LoadingLottie}
        loop={true}
        style={{ width: 180, height: 180 }}
      />
    </LottieContainer>
  );
};

export default Loading;
