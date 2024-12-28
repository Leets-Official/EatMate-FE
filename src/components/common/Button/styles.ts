import { css } from 'styled-components';

export type ButtonVariant = 'primary' | 'primary-outline';
export type ButtonSize = 'sm' | 'md';
export type ButtonRounded = 'none' | 'sm' | 'md';

const sizeStyles: Record<ButtonSize, ReturnType<typeof css>> = {
  sm: css`
    padding: 0.5rem 1rem;
  `,
  md: css`
    padding: 0.75rem 1.5rem;
  `,
};

const roundedStyles: Record<ButtonRounded, ReturnType<typeof css>> = {
  none: css`
    border-radius: 0px;
  `,
  sm: css`
    border-radius: 0.5rem;
  `,
  md: css`
    border-radius: 1rem;
  `,
};

const variantStyles: Record<ButtonVariant, ReturnType<typeof css>> = {
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

export { sizeStyles, roundedStyles, variantStyles };
