import Header from '@/components/common/Header/Header';
import { useNavigate } from 'react-router-dom';
import profileImg1 from '@/assets/images/ic_participant1.svg';
import profileImg2 from '@/assets/images/ic_participant2.svg';
import styled from 'styled-components';
import { Text } from '@/styles/mypage/mypage.styled';
import { flexColumn } from '@/styles/CommonStyle';
import Button from '@/components/common/Button/Button';
import { useEffect, useState } from 'react';
import { deleteBlockApi, getBlockApi } from '@/apis/block/getBlock';
import Loading from '@/components/common/Loading';

// const mockData = [
//   {
//     name: '무당벌레',
//     icon: profileImg1,
//     isBlocked: true,
//   },
//   {
//     name: '도토리',
//     icon: profileImg2,
//     isBlocked: true,
//   },
// ];

const Container = styled.div`
  ${flexColumn}
  padding: 20px;
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
  justify-content: space-between;
  gap: 15px;
`;

const UserDetails = styled.div`
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
  const [isLoading, setIsLoading] = useState(true);
  const [blocks, setBlocks] = useState<any[]>([]);

  useEffect(() => {
    const fetchBlocks = async () => {
      try {
        const data = await getBlockApi();
        console.log('차단내역 목록 데이터: ', data);

        if (data) {
          setBlocks(data);
        }
      } catch (error) {
        error instanceof Error
          ? error.message
          : '차단 내역을 불러오는 중 오류 발생';
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlocks();
  }, []);

  const handleUnblockUser = async (memberId: number, nickname: string) => {
    const confirmUnblock = window.confirm(
      `${nickname}님을 차단 해제하시겠어요?`
    );
    if (!confirmUnblock) return;

    try {
      await deleteBlockApi({ memberId });
      setBlocks((prev) =>
        prev.filter((user) => user.blockedMemberId !== memberId)
      );
      alert(`${nickname}님의 차단이 해제되었습니다.`);
    } catch (error) {
      console.error('차단 해제 중 오류 발생: ', error);
      alert(`${nickname}님의 차단 해제에 실패했습니다.`);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <Header
        onBackClick={() => nav(-1)}
        showBackButton
        title="차단 사용자 관리"
      />
      <Container>
        <Text fontSize="smMd" fontWeight="light" color="gray">
          친구 {blocks.length}
        </Text>
        <UserList>
          {blocks.map((user, index) => (
            <UserItem key={user.blockId}>
              <UserDetails>
                <UserIcon
                  src={
                    user.profileImageUrl ||
                    (index % 2 === 0 ? profileImg1 : profileImg2)
                  }
                  alt={user.blockedUserNickname}
                />
                <Text fontSize="sm" fontWeight="regular">
                  {user.blockedUserNickname}
                </Text>
              </UserDetails>
              <Button
                variant={user.isBlocked ? 'secondary-main' : 'secondary-white'}
                size="xs"
                rounded="lg"
                onClick={() =>
                  handleUnblockUser(
                    user.blockedMemberId,
                    user.blockedUserNickname
                  )
                }
              >
                차단 해제
              </Button>
            </UserItem>
          ))}
        </UserList>
      </Container>
    </div>
  );
};

export default ReportedUser;
