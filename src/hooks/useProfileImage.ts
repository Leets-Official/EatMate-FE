import { useState } from 'react';

export const useProfileImage = (initialImage: string | null) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(initialImage);
  const [profileImageFile, setProfileImageFile] = useState<File | null>(null);

  const handleProfileImageChange = (file: File | null) => {
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
      setProfileImageFile(file);
    } else {
      setPreviewImage(null);
      setProfileImageFile(null);
    }
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

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

  const handleDeletePhoto = () => {
    handleProfileImageChange(null);
    handleCloseModal();
  };

  return {
    isModalOpen,
    previewImage,
    profileImageFile,
    handleProfileImageChange,
    handleOpenModal,
    handleCloseModal,
    handleSelectPhoto,
    handleDeletePhoto,
  };
};
