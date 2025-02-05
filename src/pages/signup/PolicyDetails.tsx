import Header from '@/components/common/Header/Header';
import { policyConstants } from '@/constants/policyConstants';
import {
  Container,
  Divider,
  FinalNotice,
  Line,
  Section,
  SubItem,
  Text,
  TitleItem,
} from '@/styles/SignUp/PolicyAgreement.styled';
import { useParams } from 'react-router-dom';

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
  const { termId } = useParams<{ termId: string }>();

  const selectedHeader = headerItems.find((item) => item.id === termId);
  const term = policyConstants.find(
    (content) => content.id.toString() === termId
  );

  return (
    <div>
      {selectedHeader && (
        <Header showBackButton={true} title={selectedHeader.title} />
      )}
      <Line />
      <Container>
        {term?.content.map((item, index) => {
          if (typeof item === 'string') {
            return <Text key={index}>{item}</Text>;
          }

          switch (item.type) {
            case 'title':
              return <TitleItem key={index}>{item.text}</TitleItem>;
            case 'section':
              return <Section key={index}>{item.text}</Section>;
            case 'subItem':
              return <SubItem key={index}>- {item.text}</SubItem>;
            case 'finalNotice':
              return (
                <div key={index}>
                  <Divider />
                  <FinalNotice>{item.text}</FinalNotice>
                </div>
              );
            default:
              return null;
          }
        })}
      </Container>
    </div>
  );
};

export default PolicyDetails;
