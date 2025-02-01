import LoadingLottie from '@/assets/lotties/loadingLottie.json';
import Lottie from 'lottie-react';
import { LottieContainer } from '@/pages/signup/SignupSuccess';
import { useEffect, useRef } from 'react';

const Loading: React.FC = () => {
  const lottieRef = useRef<any>(null);

  useEffect(() => {
    if (lottieRef.current) {
      lottieRef.current.setSpeed(2);
    }
  }, []);

  return (
    <LottieContainer>
      <Lottie
        animationData={LoadingLottie}
        loop={true}
        style={{ width: 180, height: 180 }}
        lottieRef={lottieRef}
      />
    </LottieContainer>
  );
};

export default Loading;
