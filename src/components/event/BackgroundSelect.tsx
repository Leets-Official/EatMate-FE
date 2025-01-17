import defaultBgImg1 from '@/assets/images/ic_backimg_main.svg';
import defaultBgImg2 from '@/assets/images/ic_backImg_moohan.svg';
import SelectBgImg from '@/assets/images/ic_selectImg.svg';
import { useState } from 'react';
import styled from 'styled-components';

const ScrollContainer = styled.div`
  display: flex;
  gap: 16px;
  overflow-x: auto;
  scroll-behavior: smooth;
  max-width: 100%;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const BackgroundItem = styled.div<{ isSelected: boolean }>`
  position: relative;
  flex: 0 0 140px;
  width: 144px;
  height: 81px;
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
  }
`;
const BackgroundSelect: React.FC = () => {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const backImgs = [
    { id: 1, src: defaultBgImg1 },
    { id: 2, src: defaultBgImg2 },
    { id: 3, src: SelectBgImg },
  ];

  const handleSelect = (id: number) => {
    setSelectedId(id);
  };

  return (
    <>
      <div>배경 </div>
      <ScrollContainer>
        {backImgs.map((bgImg) => (
          <BackgroundItem
            key={bgImg.id}
            isSelected={bgImg.id === selectedId}
            onClick={() => handleSelect(bgImg.id)}
          >
            <img src={bgImg.src} alt={`backImg-${bgImg.id}`} />
          </BackgroundItem>
        ))}
      </ScrollContainer>
      모임 배경 화면에 들어갈 사진을 골라주세요
    </>
  );
};

export default BackgroundSelect;
