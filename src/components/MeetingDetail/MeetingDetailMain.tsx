import styled from 'styled-components';
import MockImage from '@/assets/images/ic_backImg_default1.svg';
import MeetingInfo from '@/components/MeetingDetail/MeetingInfo';
import ParticipantsList from '@/components/MeetingDetail/ParticipantsList';
import MailIcon from '@/assets/images/ic_mail.svg';

const Container = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.COLORS.white};
`;

const ImgContainer = styled.img`
  width: 100%;
  max-height: 200px;
  object-fit: cover;
`;

const Title = styled.h1`
  font-size: 20px;
  font-weight: bold;
  text-align: start;
  margin: 16px 0 0 28px;
  color: ${({ theme }) => theme.COLORS.black};
`;

const SectionTitle = styled.div`
  font-size: 16px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 20px 0 0 31px;
  color: ${({ theme }) => theme.COLORS.black};
`;

const Description = styled.p`
  font-size: ${({ theme }) => theme.FONT_SIZE.smMd};
  color: ${({ theme }) => theme.COLORS.gray[500]};
  line-height: 1.5;
  margin: 10px 0 0 31px;
`;

const Icon = styled.img`
  width: 18px;
  height: 18px;
`;
const Divider = styled.div`
  width: 100%;
  height: 10px;
  background-color: #f9f9fc;
  margin: 20px 0;
`;
interface MeetingDetailMainProps {
  title: string;
  description: string;
  gender: string;
  location: string;
  placeName: string;
  time: string;
  chatTime: string;
}

const MeetingDetailMain: React.FC<MeetingDetailMainProps> = ({
  title,
  description,
  gender,
  location,
  placeName,
  time,
  chatTime,
}) => {
  return (
    <Container>
      <ImgContainer src={MockImage} alt="메인 이미지" />

      <Title>{title}</Title>
      <MeetingInfo
        gender={gender}
        location={location}
        placeName={placeName}
        time={time}
        chatTime={chatTime}
      />
      <Divider />
      <SectionTitle>
        <Icon src={MailIcon} alt="설명 아이콘" />
        모임 설명
      </SectionTitle>
      <Description>{description}</Description>
      <Divider />
      <ParticipantsList />
    </Container>
  );
};

export default MeetingDetailMain;
