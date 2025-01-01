import Header from '@/components/common/Header/Header';
import { policyContents } from '@/constants/policycontents';
import { useNavigate, useParams } from 'react-router-dom';

const PolicyDetails: React.FC = () => {
  const nav = useNavigate();

  const onClickToBack = () => {
    nav(-1);
  };
  const { termId } = useParams<{ termId: string }>();
  const term = policyContents.find(
    (content) => content.id.toString() === termId
  );
  return (
    <div>
      <Header
        showBackButton={true}
        title="서비스 이용 약관"
        onBackClick={onClickToBack}
      />
      <div>{term?.title}</div>
      <div>{term?.content}</div>
    </div>
  );
};

export default PolicyDetails;
