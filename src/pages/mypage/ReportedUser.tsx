import Header from '@/components/common/Header/Header';
import { useNavigate } from 'react-router-dom';
import profileImg1 from '@/assets/images/ic_participant1.svg';
import profileImg2 from '@/assets/images/ic_participant2.svg';
import styled from 'styled-components';
import { Text } from '@/styles/mypage/mypage.styled';
import { flexColumn } from '@/styles/CommonStyle';
const mockData = [
  {
    name: '무당벌레',
    icon: profileImg1,
  },
  {
    name: '도토리',
    icon: profileImg2,
  },
];

const Container = styled.div`
  padding: 20px;
  ${flexColumn}
  gap: 20px;
`;

const UserList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const UserItem = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const UserIcon = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const ReportedUser: React.FC = () => {
  const nav = useNavigate();
  return (
    <div>
      <Header
        onBackClick={() => nav(-1)}
        showBackButton
        title="신고 사용자 관리"
      />
      <Container>
        <Text fontSize="smMd" fontWeight="light" color="gray">
          친구 {mockData.length}
        </Text>
        <UserList>
          {mockData.map((user, index) => (
            <UserItem key={index}>
              <UserIcon src={user.icon} alt={user.name} />
              <Text fontSize="sm" fontWeight="regular">
                {user.name}
              </Text>
            </UserItem>
          ))}
        </UserList>
      </Container>
    </div>
  );
};

export default ReportedUser;
