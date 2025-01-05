import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ActionModal from '../common/Modal/ActionModal';
import defaultprofileImage from '@/assets/images/defaultprofile.svg';
import Button from '../common/Button/Button';
import {
  ButtonContainer,
  Description,
  MainTitle,
} from '@/styles/SignUp/SignUp.styled';
import { useRecoilState } from 'recoil';
import { signupAtom } from '@/recoil/atoms/userAtom';

export const Container = styled.div`
  position: relative;
  min-height: 780px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

export const MainContent = styled.div`
  flex: 1;
  padding-bottom: 80px;
`;

export const ProfileImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 2rem 0;
`;

export const ProfileImage = styled.div<{ imageUrl: string }>`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.COLORS.gray[200]};
  background-image: ${({ imageUrl }) =>
    imageUrl ? `url(${imageUrl})` : 'none'};
  background-size: cover;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: ${({ theme }) => theme.FONT_SIZE.xl};
  color: ${({ theme }) => theme.COLORS.gray[100]};
  cursor: pointer;
`;

export const HiddenFileInput = styled.input`
  display: none;
`;

const ProfileImgStep: React.FC<{ onNext: () => void }> = ({ onNext }) => {
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
    setIsModalOpen(true); // 모달 열기
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // 모달 닫기
  };

  const handleSelectPhoto = () => {
    document.getElementById('fileInput')?.click(); // 파일 선택 트리거
    handleCloseModal();
  };

  const handleDeletePhoto = () => {
    setSignupState((prev) => ({
      ...prev,
      profilePhoto: undefined,
    })); // 프로필 이미지 삭제
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
