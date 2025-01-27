import Header from '@/components/common/Header/Header';
import { useNavigate } from 'react-router-dom';
import { mockData } from '@/pages/mypage/MyPage';
import * as S from '@/styles/mypage/userInfoEdit.styled';
import { Input } from '@/components/common/Input/Input';
import Button from '@/components/common/Button/Button';
import { InputWrapper } from '@/components/common/Input/styles';
import editIcon from '@/assets/images/ic_edit_camera.svg';
import googleIcon from '@/assets/images/GoogleIcon.svg';

const UserInfoEdit: React.FC = () => {
  const nav = useNavigate();
  return (
    <div>
      <Header
        onBackClick={() => nav(-1)}
        showBackButton
        title="회원정보 수정 "
      />
      <S.Container>
        <S.ProfileWrapper>
          <S.ProfileImage src={mockData.profileImg} alt="profile" />
          <S.EditIconWrapper>
            <S.EditIcon src={editIcon} alt="edit-profile" />
          </S.EditIconWrapper>
        </S.ProfileWrapper>
        <S.FormContainer>
          <InputWrapper marginBottom="-20px">
            <Input label="아이디" value={mockData.id} readOnly />
          </InputWrapper>
          <S.GoogleText>
            <S.GoogleIcon src={googleIcon} alt="google" />
            <div>구글 로그인 사용중</div>
          </S.GoogleText>
          <InputWrapper marginBottom="-30px">
            <Input label="닉네임" value={mockData.nickName} />
          </InputWrapper>
          <InputWrapper marginBottom="-30px">
            <Input label="학번" value={mockData.studentId} readOnly />
          </InputWrapper>
          <InputWrapper marginBottom="-30px">
            <Input label="전화번호" value={mockData.phoneNumber} readOnly />
          </InputWrapper>
          <InputWrapper marginBottom="-30px">
            <Input label="MBTI" value={mockData.mbti} />
          </InputWrapper>
          <Input label="생년월일" value={mockData.birthday} readOnly />
        </S.FormContainer>
        <S.ButtonContainer>
          <Button variant="primary" size="lg" rounded="sm">
            확인
          </Button>
        </S.ButtonContainer>
      </S.Container>
    </div>
  );
};

export default UserInfoEdit;
