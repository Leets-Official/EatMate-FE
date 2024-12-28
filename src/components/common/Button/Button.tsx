import React, { forwardRef } from 'react';
import styled from 'styled-components';
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
  children?: React.ReactNode;
}

const StyledButton = styled.button<ButtonProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.2s ease;
  cursor: pointer;

  ${({ size }) => size && sizeStyles[size]}
  ${({ rounded }) => rounded && roundedStyles[rounded]}
  ${({ variant }) => variant && variantStyles[variant]}

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
    { variant = 'primary', size = 'md', rounded = 'md', children, ...props },
    ref
  ) => {
    return (
      <StyledButton
        ref={ref}
        variant={variant}
        size={size}
        rounded={rounded}
        {...props}
      >
        {children}
      </StyledButton>
    );
  }
);

Button.displayName = 'Button';

export default Button;
