import Header from '@/components/common/Header/Header';
import { useNavigate } from 'react-router-dom';

const FAQ: React.FC = () => {
  const nav = useNavigate();
  return (
    <div>
      <Header onBackClick={() => nav(-1)} showBackButton title="FAQ" />
    </div>
  );
};

export default FAQ;
