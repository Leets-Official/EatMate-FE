import Header from '@/components/common/Header/Header';
import { Input } from '@/components/common/Input/Input';

const OfflineEventCreate: React.FC = () => {
  return (
    <div>
      <Header onBackClick={() => {}} showBackButton title="모임 만들기" />
      <Input
        label="모임 제목"
        as="textarea"
        placeholder="30자 이내"
        maxLength={30}
      />
      <Input
        label="모임 설명"
        as="textarea"
        placeholder="무엇을 하는 어떤 모임인가요?  100자 이내"
        maxLength={100}
        rows={4}
      />
    </div>
  );
};

export default OfflineEventCreate;
