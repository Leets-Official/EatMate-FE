import styled from 'styled-components';
import Header from '@/components/common/Header/Header';
import { flexColumn, flexColumnCenter } from '@/styles/CommonStyle';
import BlockIcon from '@/assets/images/ic_block.png';
import ProfileImg from '@/assets/images/ic_participant1.svg';

const Container = styled.div`
  ${flexColumnCenter}
  height: 100vh;
  width: 100%;
  background-color: #707070;
`;

const ProfileIcon = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 5px solid ${({ theme }) => theme.COLORS.white};
  margin-top: 150px;
`;

const Name = styled.div`
  margin-top: 8px;
  font-size: ${({ theme }) => theme.FONT_SIZE.smMd};
  color: white;
`;

const Divider = styled.div`
  width: 120%;
  height: 1px;
  background-color: ${({ theme }) => theme.COLORS.white};
  margin-top: 10px;
`;

const ButtonContainer = styled.div`
  ${flexColumn}
  color: #b6b6b6;
  font-size: ${({ theme }) => theme.FONT_SIZE.md};
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.light};
`;

const ExitButton = styled.img`
  width: 32px;
  height: 32px;
  border: none;
  cursor: pointer;
  margin: 26px 0 5px 0;
  background: transparent;
`;

const UserProfile = () => {
  return (
    <Container>
      <Header
        title={' '}
        showBackButton={true}
        onBackClick={() => console.log('뒤로가기 클릭')}
        isJoin={true}
      />
      <ProfileIcon src={ProfileImg} alt="프로필 이미지" />
      <Name>김민지</Name>
      <Divider />
      <ButtonContainer>
        <ExitButton src={BlockIcon} alt="차단" />
        차단
      </ButtonContainer>
    </Container>
  );
};

export default UserProfile;
