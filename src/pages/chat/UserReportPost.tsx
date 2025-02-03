import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Header from '@/components/common/Header/Header';
import Button from '@/components/common/Button/Button';
import { useLocation, useNavigate } from 'react-router-dom';
import BlockModal from '@/components/common/Modal/BlockModal';
import { Input } from '@/components/common/Input/Input';
import InputErrorMessage from '@/components/common/Input/InputErrorMessage';

const Container = styled.div`
  padding: 20px;
  background-color: #ffffff;
`;

const PaddingConatiner = styled.div`
  padding: 10px;
`;

const Title = styled.h2`
  font-size: ${({ theme }) => theme.FONT_SIZE.md};
  margin-top: 20px;
  text-align: center;
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.regular};
`;

const HelpText = styled.p`
  font-size: ${({ theme }) => theme.FONT_SIZE.sm};
  color: #707070;
  margin: 10px 0 20px 0;
`;

const UserReportPost = () => {
  const [report, setReport] = useState('');
  const [isOverLimit, setIsOverLimit] = useState(false);
  const [isBlockModalOpen, setIsBlockModalOpen] = useState(false);
  const [reportType, setReportType] = useState('');

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state?.reportType) {
      setReportType(location.state.reportType);
    }
  }, [location.state]);

  const handleReport = () => {
    if (!report.trim()) {
      alert('신고 사유를 입력하세요.');
      return;
    }
    setIsBlockModalOpen(true);
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const input = event.target.value;
    setReport(input);
    if (input.length > 500) {
      setIsOverLimit(true);
    } else {
      setIsOverLimit(false);
    }
  };

  const getTitleByReportType = () => {
    switch (reportType) {
      case 'OFFENSIVE':
        return '욕설';
      case 'HARASSMENT':
        return '성희롱';
      case 'OTHER':
        return '기타';
      default:
        return '신고 유형 선택';
    }
  };

  return (
    <>
      <Header
        onBackClick={() => navigate(-1)}
        showBackButton
        title="사용자 신고"
      />
      <Container>
        <PaddingConatiner>
          <Title>{getTitleByReportType()}</Title>
          <Input
            as="textarea"
            placeholder="신고 이유를 입력하세요. 500자 이내"
            value={report}
            onChange={handleChange}
            maxLength={500}
            rows={5}
          />
          {isOverLimit && (
            <InputErrorMessage message="500자 이내로 입력하세요." />
          )}
          <HelpText>
            이 항목으로 신고하면 서로의 모임 게시물이 보이지 않고, 서로 더 이상
            채팅을 할 수 없어요. (마이페이지 - 신고/차단 목록 에서 확인가능해요)
          </HelpText>
        </PaddingConatiner>
        <Button size="xl" rounded="md" onClick={handleReport}>
          신고하기
        </Button>
      </Container>
      {isBlockModalOpen && (
        <BlockModal
          isReport={true}
          onClose={() => setIsBlockModalOpen(false)}
        />
      )}
    </>
  );
};

export default UserReportPost;
