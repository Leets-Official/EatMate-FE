import React, { useState } from 'react';
import styled from 'styled-components';
import Header from '@/components/common/Header/Header';
import Button from '@/components/common/Button/Button';
import { useNavigate } from 'react-router-dom';
interface WarningTextProps {
  show: boolean;
}
const Container = styled.div`
  padding: 20px;
  background-color: #ffffff;
`;

const Title = styled.h2`
  font-size: 18px;
  color: #333;
  margin-top: 20px;
  text-align: center;
`;

const StyledInput = styled.textarea`
  width: 100%;
  height: 150px;
  margin: 20px 0;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: none;
  overflow: hidden;
`;

const HelpText = styled.p`
  font-size: 12px;
  color: #666;
  margin-bottom: 20px;
`;

const WarningText = styled.p<WarningTextProps>`
  font-size: 14px;
  color: red;
  margin-bottom: 10px;
  display: ${(props) => (props.show ? 'block' : 'none')};
`;
const UserReportPost = () => {
  const [report, setReport] = useState('');
  const [isOverLimit, setIsOverLimit] = useState(false);
  const navigate = useNavigate();

  const handleReport = () => {
    if (report.length > 500) {
      setIsOverLimit(true);
    } else {
      console.log('Report submitted:', report);
      // TODO: api 연결
      navigate(-1);
    }
  };

  const handleChange = (event: any) => {
    if (event.target.value.length <= 50) {
      setIsOverLimit(false);
    }
    setReport(event.target.value);
  };

  return (
    <>
      <Header
        onBackClick={() => navigate(-1)}
        showBackButton
        title="사용자 신고"
      />
      <Container>
        <Title>욕설</Title>
        <StyledInput
          placeholder="신고 이유를 입력하세요. 500자 이내"
          value={report}
          onChange={handleChange}
        />
        <WarningText show={isOverLimit}>500자 이내로 입력하세요</WarningText>
        <HelpText>
          이 항목으로 신고하신 사건의 모임 게시물이 보이지 않고, 작성된 이상
          참을 수 없어요. (마이페이지에서 신고/차단 목록에서 확인 가능합니다)
        </HelpText>
        <Button size="xl" rounded="md" onClick={handleReport}>
          신고하기
        </Button>
      </Container>
    </>
  );
};

export default UserReportPost;
