import Header from '@/components/common/Header/Header';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Text } from '@/styles/mypage/mypage.styled';
import { getSingleNoticeApi } from '@/apis/notice/getNotice';
import Loading from '@/components/common/Loading';
import dayjs from 'dayjs';
import { flexColumn } from '@/styles/CommonStyle';
import { Line } from '@/styles/SignUp/PolicyAgreement.styled';
import { useNavigate, useParams } from 'react-router-dom';

const DetailContainer = styled.div`
  padding: 20px;
  ${flexColumn}
  gap: 20px;
`;

const NoticeDetail: React.FC = () => {
  const { noticeId } = useParams();
  console.log('현재 noticeId 값:', noticeId);
  const nav = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [notice, setNotice] = useState<{
    id: number;
    title: string;
    date: string;
    content: string;
  } | null>(null);

  useEffect(() => {
    if (!noticeId) return;

    const fetchNoticeDetail = async () => {
      setIsLoading(true);
      try {
        const data = await getSingleNoticeApi(Number(noticeId));

        setNotice({
          id: data.noticeId,
          title: `[공지] ${data.title}`,
          date: dayjs(data.createdAt).format('YYYY.MM.DD'),
          content: data.content,
        });
      } catch (error) {
        console.error('단일 공지사항을 불러오는 중 오류 발생:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNoticeDetail();
  }, [noticeId]);

  if (isLoading) return <Loading />;

  return (
    <div>
      <Header
        onBackClick={() => nav('/mypage/notice')}
        showBackButton
        title="공지사항"
      />
      {notice && (
        <DetailContainer>
          <Text fontSize="md">{notice.title}</Text>
          <Text fontSize="sm" color="gray">
            {notice.date}
          </Text>
          <Line />
          <Text fontSize="sm">{notice.content}</Text>
        </DetailContainer>
      )}
    </div>
  );
};

export default NoticeDetail;
