import Header from '@/components/common/Header/Header';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import icArrowDown from '@/assets/images/ic_arrow_right.svg';
import { Text } from '@/styles/mypage/mypage.styled';
import { flexCenter } from '@/styles/CommonStyle';
import HandIcon from '@/assets/images/ic_open hand.svg';
import { useState } from 'react';

const Wrapper = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h2`
  font-size: 18px;
  color: #333;
`;

const InputContainer = styled.div`
  margin: 20px 0;
`;

const Input = styled.textarea`
  width: 100%;
  height: 150px;
  padding: 10px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: none; // 사용자가 크기 조절을 못하게 합니다
`;

const Button = styled.button`
  display: block;
  width: 100%;
  padding: 10px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  margin-top: 10px;
`;

const HelpText = styled.p`
  font-size: 12px;
  color: #666;
  margin-top: 5px;
`;

const UserReportPost: React.FC = () => {
  const [report, setReport] = useState('');
  const navi = useNavigate();

  const handleSubmit = (event: any) => {
    event.preventDefault();
    console.log('Report submitted:', report);
    // TODO: api 연결
  };
  return (
    <>
      <Header onBackClick={() => navi(-1)} showBackButton title="사용자 신고" />
      <Title>오성을 해요</Title>
      <form onSubmit={handleSubmit}>
        <InputContainer>
          <Input
            placeholder="신고 이유를 입력하세요. 500자 이내"
            value={report}
            onChange={(e) => setReport(e.target.value)}
          />
        </InputContainer>
        <Button type="submit">500자 이내로 입력하세요</Button>
        <HelpText>
          이 항목으로 신고하신 사건의 모임 게시물이 보이지 않고, 작성된 이상
          참을 수 없어요. (마이페이지에서 신고/차단 목록에서 확인가능합니다)
        </HelpText>
      </form>
    </>
  );
};

export default UserReportPost;
