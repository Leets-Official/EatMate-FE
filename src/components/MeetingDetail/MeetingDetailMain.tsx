import styled from 'styled-components';
import MockImage from '@/assets/images/ic_mock_img.svg';
import MeetingInfo from './MeetingInfo';
import ParticipantsList from './ParticipantsList';
import MailIcon from '@/assets/images/ic_mail.svg';

const Container = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.COLORS.white};
`;

const ImgContainer = styled.img`
  width: 100%;
  max-height: 200px;
  object-fit: cover;
  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px;
`;

const ContentWrapper = styled.div`
  padding: 20px;
`;

const Title = styled.h1`
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  margin-top: 10px;
  color: ${({ theme }) => theme.COLORS.black};
`;

const SectionTitle = styled.div`
  font-size: 16px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 20px;
  color: ${({ theme }) => theme.COLORS.black};
`;

const Description = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.COLORS.gray[500]};
  line-height: 1.5;
  margin-top: 10px;
`;

const Icon = styled.img`
  width: 18px;
  height: 18px;
`;

const MeetingDetailMain = () => {
  return (
    <Container>
      <ImgContainer src={MockImage} alt="메인 이미지" />
      <ContentWrapper>
        <Title>마라탕 맛나게 냠냠냠 ٩( ᐛ )و 모임</Title>
        <MeetingInfo />
        <SectionTitle>
          <Icon src={MailIcon} alt="설명 아이콘" />
          모임 설명
        </SectionTitle>
        <Description>
          마라탕 레전드 찐맛집입니다.
          <br />
          맛도 좋고 정문 옆이라 자주 가기
          <br />
          빠끔해서 방 팝니다!
        </Description>
        <ParticipantsList />
      </ContentWrapper>
    </Container>
  );
};

export default MeetingDetailMain;
