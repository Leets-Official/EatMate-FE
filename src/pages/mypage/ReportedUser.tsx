import Header from '@/components/common/Header/Header';
import { useNavigate } from 'react-router-dom';
// import profileImg1 from '@/assets/images/ic_participant1.svg';
// import profileImg2 from '@/assets/images/ic_participant2.svg';
import styled from 'styled-components';
import { Text } from '@/styles/mypage/mypage.styled';
import { flexColumn } from '@/styles/CommonStyle';
import { useEffect, useState } from 'react';
import { getReportApi } from '@/apis/report/getReport';
import Loading from '@/components/common/Loading';

export const Container = styled.div`
  ${flexColumn}
  padding: 20px;
  gap: 20px;
`;

export const UserList = styled.div`
  ${flexColumn}
  gap: 30px;
`;

export const UserItem = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

export const UserIcon = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const ReportedUser: React.FC = () => {
  const nav = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [reports] = useState<any[]>([]);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const data = await getReportApi();
        console.log('신고내역 목록 데이터: ', data);
      } catch (error) {
        error instanceof Error
          ? error.message
          : '신고 내역을 불러오는 중 오류 발생';
      } finally {
        setIsLoading(false);
      }
    };

    fetchReports();
  }, []);

  if (isLoading) {
    return <Loading />;
  }
  return (
    <div>
      <Header
        onBackClick={() => nav(-1)}
        showBackButton
        title="신고 사용자 관리"
      />
      <Container>
        <Text fontSize="smMd" fontWeight="light" color="gray">
          친구 {reports.length}
        </Text>
        <UserList>
          {reports.map((user, index) => (
            <UserItem key={index}>
              <UserIcon src={user.profileImageUrl} alt="" />
              <Text fontSize="sm" fontWeight="regular">
                {user.ReportedUserName}
              </Text>
            </UserItem>
          ))}
        </UserList>
      </Container>
    </div>
  );
};

export default ReportedUser;
