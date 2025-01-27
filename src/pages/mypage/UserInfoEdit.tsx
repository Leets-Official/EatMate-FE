import Header from '@/components/common/Header/Header';
import { useNavigate } from 'react-router-dom';

const UserInfoEdit: React.FC = () => {
  const nav = useNavigate();
  return (
    <div>
      <Header
        onBackClick={() => nav(-1)}
        showBackButton
        title="회원정보 수정 "
      />
    </div>
  );
};

export default UserInfoEdit;
