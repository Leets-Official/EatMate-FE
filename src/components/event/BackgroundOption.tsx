import defaultBgImg1 from '@/assets/images/ic_backImg_default1.svg';
import defaultBgImg2 from '@/assets/images/ic_backImg_default2.svg';
import SelectBgImg from '@/assets/images/ic_selectImg.svg';
import { Label } from '@/components/common/Input/styles';
import { HiddenFileInput } from '@/styles/SignUp/SignUp.styled';
import { useState } from 'react';
import styled from 'styled-components';
import InputErrorMessage from '@/components/common/Input/InputErrorMessage';

const ScrollContainer = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 10px;
  overflow-x: auto;
  scroll-behavior: smooth;
  max-width: 100%;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const BackgroundItem = styled.div<{ isSelected: boolean }>`
  position: relative;
  flex: 0 0 auto;
  width: 164px;
  height: 91px;
  overflow: hidden;
  cursor: pointer;
  box-sizing: border-box;
  transition: 0.3s;
  filter: ${({ isSelected }) => (isSelected ? 'none' : 'blur(0.5px)')};
  opacity: ${({ isSelected }) => (isSelected ? 1 : 0.6)};
  border: 2px solid
    ${({ theme, isSelected }) =>
      isSelected ? theme.COLORS.main : theme.COLORS.gray[300]};

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    aspect-ratio: 16 / 9;
  }

  &.contain {
    img {
      object-fit: contain;
    }
  }
`;

interface BackgroundOptionProps {
  onChange: (key: string, value: File | null) => void;
}

const BackgroundOption: React.FC<BackgroundOptionProps> = ({ onChange }) => {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [uploadedImg, setUploadedImg] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const backImgs = [
    { id: 1, src: defaultBgImg1 },
    { id: 2, src: defaultBgImg2 },
    { id: 3, src: SelectBgImg },
  ];

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 3 * 1024 * 1024) {
        setError('3MB 사이즈 이하의 사진만 업로드 가능합니다.');
        return;
      }
      setError(null);

      const fileUrl = URL.createObjectURL(file);
      setUploadedImg(fileUrl);
      setSelectedId(3);
      onChange('backgroundImage', file);
    }
  };

  const handleSelect = (id: number) => {
    setError(null);
    setSelectedId(id);

    if (id === 3) {
      document.getElementById('file-upload')?.click();
    } else onChange('backgroundImage', null);
  };

  return (
    <>
      <Label>배경</Label>
      <ScrollContainer>
        {backImgs.map((bgImg) => (
          <BackgroundItem
            key={bgImg.id}
            isSelected={bgImg.id === selectedId}
            onClick={() => handleSelect(bgImg.id)}
          >
            {bgImg.id === 3 && uploadedImg ? (
              <img src={uploadedImg} alt="uploadedImg" />
            ) : (
              <img src={bgImg.src} alt={`backImg-${bgImg.id}`} />
            )}
          </BackgroundItem>
        ))}
        <HiddenFileInput
          id="file-upload"
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
        />
      </ScrollContainer>
      {error && <InputErrorMessage message={error} />}
    </>
  );
};

export default BackgroundOption;
