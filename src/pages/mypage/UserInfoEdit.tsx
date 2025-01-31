import Header from '@/components/common/Header/Header';
import { useNavigate } from 'react-router-dom';
import { mockData } from '@/pages/mypage/MyPage';
import * as S from '@/styles/mypage/userInfoEdit.styled';
import { Input } from '@/components/common/Input/Input';
import Button from '@/components/common/Button/Button';
import { InputWrapper } from '@/components/common/Input/styles';
import editIcon from '@/assets/images/ic_edit_camera.svg';
import googleIcon from '@/assets/images/GoogleIcon.svg';
import { useState } from 'react';
import ActionModal from '@/components/common/Modal/ActionModal';

const UserInfoEdit: React.FC = () => {
  const nav = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleProfileClick = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const inputFields = [
    {
      label: '아이디',
      value: mockData.id,
      readOnly: true,
      marginBottom: '-10px',
      extra: (
        <S.GoogleText>
          <S.GoogleIcon src={googleIcon} alt="google" />
          <div>구글 로그인 사용중</div>
        </S.GoogleText>
      ),
    },
    {
      label: '닉네임',
      value: mockData.nickName,
      readOnly: false,
      marginBottom: '-30px',
    },
    {
      label: '학번',
      value: mockData.studentId,
      readOnly: true,
      marginBottom: '-30px',
    },
    {
      label: '전화번호',
      value: mockData.phoneNumber,
      readOnly: true,
      marginBottom: '-30px',
    },
    {
      label: 'MBTI',
      value: mockData.mbti,
      readOnly: false,
      marginBottom: '-30px',
    },
    {
      label: '생년월일',
      value: mockData.birthday,
      readOnly: true,
      marginBottom: '0px',
    },
  ];

  return (
    <div>
      <Header
        onBackClick={() => nav(-1)}
        showBackButton
        title="회원정보 수정 "
      />
      <S.Container>
        <S.ProfileWrapper onClick={handleProfileClick}>
          <S.ProfileImage src={mockData.profileImg} alt="profile" />
          <S.EditIconWrapper>
            <S.EditIcon src={editIcon} alt="edit-profile" />
          </S.EditIconWrapper>
        </S.ProfileWrapper>
        <S.FormContainer>
          {inputFields.map((field, index) => (
            <InputWrapper key={index} marginBottom={field.marginBottom}>
              <Input
                label={field.label}
                value={field.value}
                readOnly={field.readOnly}
                keepBackground
              />
              {field.extra && field.extra}
            </InputWrapper>
          ))}
        </S.FormContainer>
        <S.ButtonContainer>
          <Button variant="primary" size="lg" rounded="sm">
            확인
          </Button>
        </S.ButtonContainer>
      </S.Container>

      <ActionModal
        isOpen={isModalOpen}
        onClose={closeModal}
        actions={[
          {
            label: '앨범에서 선택',
            onClick: () => {
              console.log('사진 변경 클릭');
              closeModal();
            },
          },
          {
            label: '기본 이미지로 변경',
            onClick: () => {
              console.log('기본 이미지로 변경 클릭');
              closeModal();
            },
            type: 'delete',
          },
          {
            label: '닫기',
            onClick: closeModal,
          },
        ]}
      />
    </div>
  );
};

export default UserInfoEdit;
