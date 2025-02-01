import { useState } from 'react';

export const useProfileImage = (
  initialImage: string | null,
  onImageChange: (file: File | null) => void
) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(initialImage);

  const handleProfileImageChange = (file: File | null) => {
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
      onImageChange(file);
    } else {
      setPreviewImage(null);
      onImageChange(null);
    }
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // 파일 업로드
  const handleSelectPhoto = () => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        handleProfileImageChange(file);
      }
    };
    fileInput.click();
    handleCloseModal();
  };

  // 기본 이미지로 변경
  const handleDeletePhoto = () => {
    handleProfileImageChange(null);
    handleCloseModal();
  };

  return {
    isModalOpen,
    previewImage,
    handleOpenModal,
    handleCloseModal,
    handleSelectPhoto,
    handleDeletePhoto,
  };
};
