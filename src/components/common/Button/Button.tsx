import React, { forwardRef } from 'react';
import styled, { css } from 'styled-components';
import {
  ButtonVariant,
  ButtonSize,
  ButtonRounded,
  sizeStyles,
  roundedStyles,
  variantStyles,
} from './styles';

interface ButtonProps extends React.ComponentProps<'button'> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  rounded?: ButtonRounded;
  color?: 'white' | 'black';
  svgIcon?: boolean; // svg아이콘 여부
  children?: React.ReactNode;
}

const StyledButton = styled.button<ButtonProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.2s ease;
  cursor: pointer;

  ${({ size, svgIcon }) => size && sizeStyles[size](!!svgIcon)}
  ${({ rounded }) => rounded && roundedStyles[rounded]}
  ${({ variant }) => variant && variantStyles[variant]}

  /* 조건부 텍스트 색상 */
  ${({ color }) =>
    color === 'black' &&
    css`
      color: black;
    `}


  &:hover {
    opacity: 0.9;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
`;

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      rounded = 'md',
      color = 'white',
      svgIcon = false,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <StyledButton
        ref={ref}
        variant={variant}
        size={size}
        rounded={rounded}
        color={color}
        svgIcon={svgIcon}
        {...props}
      >
        {children}
      </StyledButton>
    );
  }
);

Button.displayName = 'Button';

export default Button;
