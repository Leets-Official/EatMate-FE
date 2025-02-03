import Header from '@/components/common/Header/Header';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Text } from '@/styles/mypage/mypage.styled';
import { getNoticeApi, getNoticeParams } from '@/apis/notice/getNotice';
import Loading from '@/components/common/Loading';
import dayjs from 'dayjs';

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
  const [selectedNotice, setSelectedNotice] = useState<{
    id: number;
    title: string;
    date: string;
    content: string;
  } | null>(null);

  const [notices, setNotices] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [params] = useState<getNoticeParams>({
    pageNumber: 0,
    pageSize: 20,
  });

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const data = await getNoticeApi(params);
        console.log('공지사항 데이터:', data);

        setNotices(
          data.content.map((notice: any) => ({
            ...notice,
            formattedDate: dayjs(notice.createdAt).format('YYYY.MM.DD'),
            title: `[공지] ${notice.title}`,
          }))
        );
      } catch (error) {
        console.error('공지사항 데이터를 불러오는 중 오류 발생:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNotices();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

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
          {notices.map((notice) => (
            <NoticeItem
              key={notice.noticeId}
              onClick={() => setSelectedNotice(notice)}
            >
              <Text fontSize="smMd">{notice.title}</Text>
              <Text fontSize="sm" color="gray">
                {notice.formattedDate}
              </Text>
            </NoticeItem>
          ))}
        </NoticeWrapper>
      )}
    </div>
  );
};

export default Notice;
