import React, { useEffect, useState } from 'react';
import {
  ButtonContainer,
  Description,
  MainTitle,
  MainContent,
  ProfileImageContainer,
  ProfileImage,
  EditIcon,
  EditIconWrapper,
  HiddenFileInput,
} from '@/styles/SignUp/SignUp.styled';
import ActionModal from '@/components/common/Modal/ActionModal';
import Button from '@/components/common/Button/Button';
import { useRecoilState } from 'recoil';
import { signupAtom } from '@/recoil/atoms/userAtom';
import { useNavigate } from 'react-router-dom';
import ProfileIcon from '@/assets/images/ic_my_profile.svg';
import editIcon from '@/assets/images/ic_edit_camera.svg';

const ProfileImgStep: React.FC = () => {
  const nav = useNavigate();

  const [signupState, setSignupState] = useRecoilState(signupAtom);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) {
          setSignupState((prev) => ({
            ...prev,
            profileImage: file,
          }));
        }
      };
      // const objectUrl = URL.createObjectURL(file);
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
      profilePhoto: null,
    }));
    setPreviewUrl(null);
    handleCloseModal();
  };

  const handleProceedToNextStep = () => {
    nav('/signup/phone-number');
  };

  useEffect(() => {
    console.log('signupState updated:', signupState);
  }, [signupState]);

  return (
    <div>
      <MainContent>
        <MainTitle>
          나만의 프로필을 <br />
          설정하세요
        </MainTitle>

        <ProfileImageContainer onClick={handleOpenModal}>
          <ProfileImage
            imageUrl={
              previewUrl ||
              (signupState.profileImage
                ? URL.createObjectURL(signupState.profileImage)
                : ProfileIcon)
            } // 기본 이미지 설정
            onClick={handleOpenModal}
          />
          <EditIconWrapper>
            <EditIcon src={editIcon} alt="edit-profile" />
          </EditIconWrapper>
          <HiddenFileInput
            id="fileInput"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
        </ProfileImageContainer>
        <Description padding="30px">
          다른 사용자들에게 보이는 사진이에요.
        </Description>
      </MainContent>

      {/* 모달 */}
      {isModalOpen && (
        <ActionModal
          isOpen={isModalOpen}
          actions={[
            { label: '앨범에서 선택', onClick: handleSelectPhoto },
            {
              label: '기본 이미지로 설정',
              onClick: handleDeletePhoto,
              type: 'delete',
            },
            { label: '닫기', onClick: handleCloseModal },
          ]}
          onClose={handleCloseModal}
        />
      )}

      <ButtonContainer>
        <Button
          onClick={handleProceedToNextStep}
          size="lg"
          // disabled={!signupState.profilePhoto} // 프로필 이미지가 없으면 버튼 비활성화
        >
          다음
        </Button>
      </ButtonContainer>
    </div>
  );
};

export default ProfileImgStep;
