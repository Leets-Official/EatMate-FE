import React, { forwardRef } from 'react';
import styled, { css } from 'styled-components';

interface ButtonProps extends React.ComponentProps<'button'> {
  isSelected?: boolean;
  text: string;
  iconType: 'upDown' | 'downArrow';
  onClick?: () => void;
}

const StyledButton = styled.button<{ isSelected: boolean }>`
  width: 77px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  padding: 8px 10px;
  font-size: 12px;
  font-weight: 500;
  border-radius: 13.5px;
  cursor: pointer;
  transition: all 0.2s ease;

  ${({ isSelected }) =>
    isSelected
      ? css`
          border: 0.5px solid #ccc;
          background-color: #fff;
        `
      : css`
          border: 0.5px #f3f4f5;
          background-color: #f7f8fa;
        `}

  &:hover {
    opacity: 0.9;
  }
`;

const Icon = styled.img`
  width: 13px;
  height: 13px;
`;

const SortingButton = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ isSelected = false, text, iconType, onClick }, ref) => {
    // 아이콘 경로 설정
    const getIconSrc = () => {
      switch (iconType) {
        case 'upDown':
          return '/src/assets/images/ic_default_sort.svg';
        case 'downArrow':
          return '/src/assets/images/ic_arrow_bottom.svg';
        default:
          return '';
      }
    };

    return (
      <StyledButton ref={ref} isSelected={isSelected} onClick={onClick}>
        {text}
        <Icon src={getIconSrc()} alt={`${iconType} icon`} />
      </StyledButton>
    );
  }
);

SortingButton.displayName = 'Button';

export default SortingButton;
