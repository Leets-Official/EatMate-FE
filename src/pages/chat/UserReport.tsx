import Header from '@/components/common/Header/Header';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import icArrowDown from '@/assets/images/ic_arrow_right.svg';
import { Text } from '@/styles/mypage/mypage.styled';

const FaqWrapper = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
`;

const Container = styled.div`
  padding: 15px 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ReportText = styled.div`
  font-size: ${({ theme }) => theme.FONT_SIZE.smMd};
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.light};
  display: flex;
  align-items: center;
  gap: 10px;
`;

const ArrowIcon = styled.img`
  width: 14px;
  height: 14px;
  filter: invert(40%) sepia(92%) saturate(3264%) hue-rotate(352deg)
    brightness(103%) contrast(90%);
`;

const Divider = styled.div`
  width: 100%;
  height: 10px;
  background-color: #f9f9fc;
`;

const UserReport: React.FC = () => {
  const nav = useNavigate();
  const reportConstants = [
    {
      text: '욕설을 해요',
      reportType: 'ㅇ',
    },
    {
      text: '성희롱을 해요',
      reportType: '비밀번호는 구글 계정 설정에서만 변경하실 수 있어요.',
    },
    {
      text: '다른 문제가 있어요',
      reportType: '비밀번호는 구글 계정 설정에서만 변경하실 수 있어요.',
    },
  ];
  return (
    <>
      <Header onBackClick={() => nav(-1)} showBackButton title="사용자 신고" />
      <FaqWrapper>
        {reportConstants.map((report) => (
          <div>
            <Divider />
            <Container onClick={() => console.log('욕설')}>
              <ReportText>
                <Text color="main" fontSize="md">
                  |
                </Text>
                {report.text}
              </ReportText>
              <ArrowIcon src={icArrowDown} alt="" />
            </Container>
          </div>
        ))}
      </FaqWrapper>
    </>
  );
};

export default UserReport;
