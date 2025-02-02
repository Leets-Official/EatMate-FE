import Header from '@/components/common/Header/Header';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import icArrowDown from '@/assets/images/ic_arrow_right.svg';
import { Text } from '@/styles/mypage/mypage.styled';
import { flexCenter } from '@/styles/CommonStyle';
import HandIcon from '@/assets/images/ic_open hand.svg';

const Wrapper = styled.div`
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

const Description = styled.div`
  ${flexCenter}
  font-size: ${({ theme }) => theme.FONT_SIZE.smMd};
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.light};
  margin: 20px 0;
  width: 100%;
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

const HandIconImg = styled.img`
  ${flexCenter}
  width: 100%;
  height: 100px;
  margin-bottom: 50px;
`;

const UserReport: React.FC = () => {
  const navi = useNavigate();
  const reportConstants = [
    {
      text: '욕설을 해요',
      reportType: 'OFFENSIVE',
    },
    {
      text: '성희롱을 해요',
      reportType: 'HARASSMENT',
    },
    {
      text: '다른 문제가 있어요',
      reportType: 'OTHER',
    },
  ];
  return (
    <>
      <Header onBackClick={() => navi(-1)} showBackButton title="사용자 신고" />
      <Description>사용자를 신고하는 이유를 선택해주세요</Description>
      <HandIconImg src={HandIcon} alt="손" />
      <Wrapper>
        {reportConstants.map((report) => (
          <div>
            <Divider />
            <Container onClick={() => navi('/report/post')}>
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
      </Wrapper>
    </>
  );
};

export default UserReport;
