import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Header from '@/components/common/Header/Header';
import Button from '@/components/common/Button/Button';
import { useLocation, useNavigate } from 'react-router-dom';
import BlockModal from '@/components/common/Modal/BlockModal';
interface WarningTextProps {
  show: boolean;
}
const Container = styled.div`
  padding: 20px;
  background-color: #ffffff;
`;

const Title = styled.h2`
  font-size: ${({ theme }) => theme.FONT_SIZE.md};
  margin-top: 20px;
  text-align: center;
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.regular};
`;

const StyledInput = styled.textarea`
  width: 100%;
  height: 150px;
  margin: 20px 0;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  resize: none;
  overflow: hidden;
  &::placeholder {
    color: ${({ theme }) => theme.COLORS.gray[200]};
  }
  &:focus {
    border-color: ${({ theme }) => theme.COLORS.main};
    outline: none;
  }
`;

const HelpText = styled.p`
  font-size: ${({ theme }) => theme.FONT_SIZE.sm};
  color: #707070;
  margin-bottom: 20px;
`;

const WarningText = styled.p<WarningTextProps>`
  font-size: ${({ theme }) => theme.FONT_SIZE.smMd};
  color: red;
  margin-bottom: 10px;
  display: ${(props) => (props.show ? 'block' : 'none')};
`;
const UserReportPost = () => {
  const [report, setReport] = useState('');
  const [isOverLimit, setIsOverLimit] = useState(false);
  const [isBlockModalOpen, setIsBlockModalOpen] = useState(false);
  const [reportType, setReportType] = useState('');

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state && location.state.reportType) {
      setReportType(location.state.reportType);
    }
  }, [location.state]);

  const handleReport = () => {
    if (report.length > 50) {
      setIsOverLimit(true);
    } else {
      console.log('Report submitted:', report);
      setIsBlockModalOpen(true);
    }
  };

  const handleChange = (event: any) => {
    if (event.target.value.length <= 50) {
      setIsOverLimit(false);
    }
    setReport(event.target.value);
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
        <Title>{getTitleByReportType()}</Title>
        <StyledInput
          placeholder="신고 이유를 입력하세요. 500자 이내"
          value={report}
          onChange={handleChange}
        />
        <WarningText show={isOverLimit}>500자 이내로 입력하세요</WarningText>
        <HelpText>
          이 항목으로 신고하면 서로의 모임 게시물이 보이지 않고, 서로 더 이상
          채팅을 할 수 없어요. (마이페이지 - 신고/차단 목록 에서 확인가능해요)
        </HelpText>
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
