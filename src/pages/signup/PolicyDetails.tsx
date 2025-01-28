import Header from '@/components/common/Header/Header';
import { policyContants } from '@/constants/policyContants';
import { useNavigate, useParams } from 'react-router-dom';

const headerItems = [
  {
    id: '1',
    title: '서비스 이용 약관',
  },
  {
    id: '2',
    title: '개인정보 보호정책',
  },
];
const PolicyDetails: React.FC = () => {
  const nav = useNavigate();
  const { termId } = useParams<{ termId: string }>();

  const onClickToBack = () => {
    nav(-1);
  };

  const selectedHeader = headerItems.find((item) => item.id === termId);
  const term = policyContants.find(
    (content) => content.id.toString() === termId
  );

  return (
    <div>
      {selectedHeader && (
        <Header
          showBackButton={true}
          title={selectedHeader.title}
          onBackClick={onClickToBack}
        />
      )}
      <div>{term?.title}</div>
      <div>{term?.content}</div>
    </div>
  );
};

export default PolicyDetails;
