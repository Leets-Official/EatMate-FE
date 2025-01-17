import Button from '@/components/common/Button/Button';
import Header from '@/components/common/Header/Header';
import { Input } from '@/components/common/Input/Input';
import BackgroundSelect from '@/components/event/BackgroundSelect';
import styled from 'styled-components';

const ContentPadding = styled.div`
  padding: 20px 30px;
`;

const OfflineEventCreate: React.FC = () => {
  return (
    <div>
      <Header onBackClick={() => {}} showBackButton title="모임 만들기" />
      <ContentPadding>
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
        <BackgroundSelect />
        <Input label="가게 이름" as="input" placeholder="가게명 입력" />

        <Button variant="primary" size="lg" rounded="md">
          모임 만들기
        </Button>
      </ContentPadding>
    </div>
  );
};

export default OfflineEventCreate;
