import Header from '@/components/common/Header/Header';
import { useNavigate } from 'react-router-dom';

const MyCreatedMeetings: React.FC = () => {
  const nav = useNavigate();
  return (
    <div>
      <Header
        onBackClick={() => nav(-1)}
        showBackButton
        title="내가 생성한 모임"
      />
    </div>
  );
};

export default MyCreatedMeetings;
