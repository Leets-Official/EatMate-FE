import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Splash: React.FC = () => {
  const nav = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      nav('/intro');
    }, 2000);

    return () => clearTimeout(timer);
  }, [nav]);

  // 애니메이션 나중에 추가 예정
  return <div>스플래시 화면</div>;
};

export default Splash;
