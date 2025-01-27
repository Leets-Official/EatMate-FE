import Header from '@/components/common/Header/Header';
import { useNavigate } from 'react-router-dom';

const BlockedUser: React.FC = () => {
  const nav = useNavigate();
  return (
    <div>
      <Header
        onBackClick={() => nav(-1)}
        showBackButton
        title="차단 사용자 관리"
      />
    </div>
  );
};

export default BlockedUser;
