import { css } from 'styled-components';

export type ButtonVariant = 'primary' | 'primary-outline';
export type ButtonSize = 'sm' | 'md' | 'lg';
export type ButtonRounded = 'none' | 'sm' | 'md';

const sizeStyles: Record<ButtonSize, ReturnType<typeof css>> = {
  sm: css`
    width: 50%;
    font-size: 10px;
    padding: 0.6rem 1.2rem;
  `,
  md: css`
    width: 75%;
    font-size: 16px;
    padding: 0.9rem 1.7rem;
  `,
  lg: css`
    width: 100%;
    padding: 1rem 2rem;
    font-size: 18px;
  `,
};

const roundedStyles: Record<ButtonRounded, ReturnType<typeof css>> = {
  none: css`
    border-radius: 0px;
  `,
  sm: css`
    border-radius: 8px;
  `,
  md: css`
    border-radius: 12px;
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
