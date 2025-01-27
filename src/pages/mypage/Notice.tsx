import Header from '@/components/common/Header/Header';
import { useState } from 'react';
import styled from 'styled-components';
import { Text } from '@/styles/mypage/mypage.styled';

const mockData = [
  {
    id: 1,
    title: '[공지] 노쇼 시 신고 대상이 될 수 있어요.',
    date: '2025.02.06',
    content:
      '노쇼나 배달비를 입금하지 않으면 신고가 되어 법적 조치까지 갈 수 있습니다. 주의해 주세요.',
  },
  {
    id: 2,
    title: '[공지] 배달팟 이용 관련 안내',
    date: '2025.02.04',
    content: '배달팟 이용 시 주의 사항을 숙지하시고 원활한 참여 바랍니다.',
  },
  {
    id: 3,
    title: '[공지] 배달팟 이용 관련 안내',
    date: '2025.02.04',
    content: '배달팟 이용 시 주의 사항을 숙지하시고 원활한 참여 바랍니다.',
  },
  {
    id: 4,
    title: '[공지] 배달팟 이용 관련 안내',
    date: '2025.02.04',
    content: '배달팟 이용 시 주의 사항을 숙지하시고 원활한 참여 바랍니다.',
  },
];

const NoticeWrapper = styled.div`
  padding: 20px;
`;

const NoticeItem = styled.div`
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.COLORS.gray[100]};
  background-color: ${({ theme }) => theme.COLORS.white};
  cursor: pointer;
`;

const DetailContainer = styled.div`
  padding: 20px;
`;

const Notice: React.FC = () => {
  const [selectedNotice, setSelectedNotice] = useState<
    (typeof mockData)[0] | null
  >(null);

  return (
    <div>
      <Header
        onBackClick={() =>
          selectedNotice ? setSelectedNotice(null) : window.history.back()
        }
        showBackButton
        title="공지사항"
      />
      {selectedNotice ? (
        <DetailContainer>
          <Text fontSize="smMd">{selectedNotice.title}</Text>
          <Text fontSize="sm" color="gray">
            {selectedNotice.date}
          </Text>
          <Text fontSize="sm">{selectedNotice.content}</Text>
        </DetailContainer>
      ) : (
        <NoticeWrapper>
          {mockData.map((notice) => (
            <NoticeItem
              key={notice.id}
              onClick={() => setSelectedNotice(notice)}
            >
              <Text fontSize="smMd">{notice.title}</Text>
              <Text fontSize="sm" color="gray">
                {notice.date}
              </Text>
            </NoticeItem>
          ))}
        </NoticeWrapper>
      )}
    </div>
  );
};

export default Notice;
