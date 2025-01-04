import React, { useState } from 'react';
import {
  ButtonContainer,
  Description,
  MainTitle,
} from '@/styles/SignUp/SignUp.styled';
import Button from '@/components/common/Button/Button';
import styled from 'styled-components';
import defaultprofileImage from '@/assets/images/defaultprofile.svg';
import ActionModal from '../common/Modal/ActionModal';

const ProfileImgStep: React.FC<{ onNext: () => void }> = ({ onNext }) => {
  const [profileImage, setProfileImage] = useState<string | null>(
    defaultprofileImage
  );

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) {
          setProfileImage(reader.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };
  const handleImageClick = () => {
    setIsModalOpen(true); // 이미지 클릭 시 모달 열기
  };

  const handleModalClose = () => {
    setIsModalOpen(false); // 모달 닫기
  };

  const handleDeleteImage = () => {
    setProfileImage(defaultprofileImage); // 프로필 이미지 삭제
    setIsModalOpen(false);
  };

  return (
    <div>
      <MainTitle>이제 마지막이에요!</MainTitle>
      <Description>EatMate에서 사용할 프로필 사진을 추가해주세요.</Description>

      <ProfileImageContainer>
        <label>
          <ProfileImage
            onClick={handleImageClick}
            imageUrl={profileImage || ''}
          >
            {!profileImage && <span>+</span>}
          </ProfileImage>
          <HiddenFileInput
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
        </label>
      </ProfileImageContainer>

      <ActionModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        title="프로필 사진 설정"
        actions={[
          {
            label: '앨범에서 선택',
            onClick: () => {
              document
                .querySelector<HTMLInputElement>('input[type="file"]')
                ?.click(); // 파일 선택 트리거
              setIsModalOpen(false);
            },
          },
          {
            label: '사진 삭제',
            onClick: handleDeleteImage,
          },
        ]}
      />
      <ButtonContainer>
        <Button
          onClick={onNext}
          variant="primary"
          size="lg"
          rounded="sm"
          disabled={!profileImage} // 이미지 업로드 시에만 활성화
        >
          회원가입 진행하기
        </Button>
      </ButtonContainer>
    </div>
  );
};

export default ProfileImgStep;

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
