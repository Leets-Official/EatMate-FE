import React, { useEffect, useState } from 'react';
import {
  ButtonContainer,
  Description,
  MainTitle,
  Container,
  MainContent,
  ProfileImageContainer,
  ProfileImage,
  HiddenFileInput,
} from '@/styles/SignUp/SignUp.styled';
import ActionModal from '../common/Modal/ActionModal';
import defaultprofileImage from '@/assets/images/defaultprofile.svg';
import Button from '../common/Button/Button';
import { useRecoilState } from 'recoil';
import { signupAtom } from '@/recoil/atoms/userAtom';

const ProfileImgStep: React.FC = () => {
  const [signupState, setSignupState] = useRecoilState(signupAtom);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) {
          setSignupState((prev) => ({
            ...prev,
            profilePhoto: reader.result as string,
          }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSelectPhoto = () => {
    document.getElementById('fileInput')?.click();
    handleCloseModal();
  };

  const handleDeletePhoto = () => {
    setSignupState((prev) => ({
      ...prev,
      profilePhoto: undefined,
    }));
    handleCloseModal();
  };

  useEffect(() => {
    console.log('signupState updated:', signupState);
  }, [signupState]);

  return (
    <Container>
      <MainContent>
        <MainTitle>이제 마지막이에요!</MainTitle>
        <Description>
          EatMate에서 사용할 프로필 사진을 추가해주세요.
        </Description>

        <ProfileImageContainer>
          <ProfileImage
            imageUrl={signupState.profilePhoto || ''}
            onClick={handleOpenModal}
          >
            {!signupState.profilePhoto && <span>+</span>}
          </ProfileImage>
          <HiddenFileInput
            id="fileInput"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
        </ProfileImageContainer>
      </MainContent>

      {/* 모달 */}
      {isModalOpen && (
        <ActionModal
          isOpen={isModalOpen}
          actions={[
            { label: '앨범에서 선택', onClick: handleSelectPhoto },
            { label: '사진 삭제', onClick: handleDeletePhoto, type: 'delete' },
            { label: '닫기', onClick: handleCloseModal },
          ]}
          onClose={handleCloseModal}
        />
      )}

      <ButtonContainer>
        <Button
          onClick={onNext}
          size="lg"
          disabled={!signupState.profilePhoto} // 프로필 이미지가 없으면 버튼 비활성화
        >
          회원가입 진행하기
        </Button>
      </ButtonContainer>
    </Container>
  );
};

export default ProfileImgStep;
