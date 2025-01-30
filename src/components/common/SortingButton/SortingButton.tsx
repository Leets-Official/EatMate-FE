import { flexCenter } from '@/styles/CommonStyle';
import React, { forwardRef } from 'react';
import styled from 'styled-components';
import DownArrow from '@/assets/images/ic_arrow_bottom.svg';
import UpDownArrow from '@/assets/images/ic_default_sort.svg';

interface ButtonProps extends React.ComponentProps<'button'> {
  isSelected?: boolean;
  text: string;
  iconType: 'upDown' | 'downArrow';
  onClick?: () => void;
}

const StyledButton = styled.button<{ isSelected?: boolean }>`
  height: 27px;
  ${flexCenter}
  gap: 4px;
  padding: 0 12px;
  font-size: ${({ theme }) => theme.FONT_SIZE.sm};
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.regular};
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

const Icon = styled.img<{ isSelected?: boolean }>`
  width: 13px;
  height: 13px;
  filter: ${({ isSelected }) =>
    isSelected
      ? `invert(36%) sepia(98%) saturate(421%) hue-rotate(335deg) brightness(96%) contrast(94%)`
      : 'none'};
`;

const SortingButton = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ text, iconType, isSelected, onClick }, ref) => {
    // 아이콘 경로 설정
    const getIconSrc = () => {
      switch (iconType) {
        case 'upDown':
          return DownArrow;
        case 'downArrow':
          return UpDownArrow;
        default:
          return '';
      }
    };

    return (
      <StyledButton ref={ref} onClick={onClick} isSelected={isSelected}>
        {text}
        <Icon
          src={getIconSrc()}
          alt={`${iconType} icon`}
          isSelected={isSelected}
        />
      </StyledButton>
    );
  }
);

SortingButton.displayName = 'Button';

export default SortingButton;
