import React, { forwardRef } from 'react';
import styled from 'styled-components';

interface ButtonProps extends React.ComponentProps<'button'> {
  isSelected?: boolean;
  text: string;
  iconType: 'upDown' | 'downArrow';
  onClick?: () => void;
}

const StyledButton = styled.button<{ isSelected?: boolean }>`
  height: 27px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  padding: 0 12px;
  font-size: 12px;
  font-weight: 500;
  border-radius: 13.5px;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.2s ease;
  border: 1px solid
    ${({ isSelected, theme }) => (isSelected ? theme.COLORS.main : '#ddd')};
  background: ${({ theme }) => theme.COLORS.white};
  color: ${({ isSelected, theme }) =>
    isSelected ? theme.COLORS.main : '#333'};

  &:hover {
    opacity: 0.9;
  }
`;

const Icon = styled.img`
  width: 13px;
  height: 13px;
`;

const SortingButton = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ text, iconType, isSelected, onClick }, ref) => {
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
      <StyledButton ref={ref} onClick={onClick} isSelected={isSelected}>
        {text}
        <Icon src={getIconSrc()} alt={`${iconType} icon`} />
      </StyledButton>
    );
  }
);

SortingButton.displayName = 'Button';

export default SortingButton;
