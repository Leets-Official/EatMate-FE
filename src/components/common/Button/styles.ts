import { css } from '@emotion/react';

export type ButtonVariant = 'primary' | 'primary-outline';
export type ButtonSize = 'sm' | 'md';
export type ButtonRounded = 'none' | 'sm' | 'md';

const styles = {
  button: (
    variant: ButtonVariant,
    size: ButtonSize,
    rounded: ButtonRounded
  ) => css`
    display: flex;
    justify-content: center;
    align-items: center;
    align-items: center;
    padding: ${sizeStyles[size]};
    border-radius: ${roundedStyles[rounded]};
    transition: all 0.2s ease;
    cursor: pointer;

    ${variantStyles[variant]}

    &:hover {
      opacity: 0.9;
    }

    &:disabled {
      cursor: not-allowed;
      opacity: 0.6;
    }
  `,
};

const sizeStyles = {
  sm: '0.5rem 1rem',
  md: '0.75rem 1.5rem',
};

const roundedStyles = {
  none: '0px',
  sm: '0.5rem',
  md: '1rem',
};

const variantStyles = {
  'primary': css`
    background-color: ${({ theme }) => theme.COLORS.primary.main};
    color: white;
    border: none;
  `,
  'primary-outline': css`
    background-color: white;
    color: ${({ theme }) => theme.COLORS.primary.main};
    border: 1px solid ${({ theme }) => theme.COLORS.primary.main};
  `,
};

export default styles;
