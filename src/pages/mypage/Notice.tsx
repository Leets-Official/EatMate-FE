import Header from '@/components/common/Header/Header';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Text } from '@/styles/mypage/mypage.styled';
import { getNoticeApi, getNoticeParams } from '@/apis/notice/getNotice';
import Loading from '@/components/common/Loading';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';

const NoticeWrapper = styled.div`
  padding: 20px;
`;

const NoticeItem = styled.div`
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.COLORS.gray[300]};
  background-color: ${({ theme }) => theme.COLORS.white};
  cursor: pointer;
`;

const Notice: React.FC = () => {
  const nav = useNavigate();
  const [notices, setNotice] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [params] = useState<getNoticeParams>({
    pageNumber: 0,
    pageSize: 20,
  });

  // 공지사항 목록 가져오기
  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const data = await getNoticeApi(params);
        console.log('공지사항 데이터:', data);

        setNotice(
          data.content.map((notice: any) => ({
            id: notice.noticeId,
            date: dayjs(notice.createdAt).format('YYYY.MM.DD'),
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
      <Header onBackClick={() => nav(-1)} showBackButton title="공지사항" />
      <NoticeWrapper>
        {notices.map((notice) => (
          <NoticeItem
            key={notice.id}
            onClick={() => nav(`/mypage/notice/${notice.id}`)}
          >
            <Text fontSize="smMd">{notice.title}</Text>
            <Text fontSize="sm" color="gray">
              {notice.date}
            </Text>
          </NoticeItem>
        ))}
      </NoticeWrapper>
    </div>
  );
};

export default Notice;
