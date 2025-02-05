import CryingGIF from '@/assets/images/ic_crying.gif';
import Header from '@/components/common/Header/Header';

const SignupError: React.FC = () => {
  return (
    <div>
      <Header showBackButton={true} showLogo={false} />
      {/* <Outlet />
      <MainTitle>이메일을 다시 입력해주세요</MainTitle>
      <Description padding="30px">
        입력하신 이메일이 학교 이메일(@gachon.ac.kr)이
        <br />
        아닌거 같아요 학교 이메일로 다시 시도해주세요
      </Description>
      <CryingContainer>
        <ProfileImage imageUrl={cryingFace}></ProfileImage>
      </CryingContainer>
      <ButtonContainer>
        <Button size="lg">홈으로 돌아가기</Button>
      </ButtonContainer> */}
    </div>
  );
};

export default SignupError;
