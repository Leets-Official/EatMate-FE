import { css } from 'styled-components';

export type ButtonVariant = 'primary' | 'primary-outline';
export type ButtonSize = 'sm' | 'md' | 'lg';
export type ButtonRounded = 'none' | 'sm' | 'md';

const sizeStyles: Record<ButtonSize, ReturnType<typeof css>> = {
  sm: css`
    width: 50%;
    font-size: 10px;
    padding: 0.3rem 1.2rem;
  `,
  md: css`
    width: 75%;
    font-size: 16px;
    padding: 0.3rem 1.5rem;
  `,
  lg: css`
    width: 100%;
    padding: 0.3rem 1.5rem;
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
    font-weight: ${({ theme }) => theme.FONT_WEIGHT.semibold};
  `,
  'primary-outline': css`
    background-color: white;
    font-weight: ${({ theme }) => theme.FONT_WEIGHT.semibold};
    color: ${({ theme }) => theme.COLORS.primary.main};
    border: 1px solid ${({ theme }) => theme.COLORS.primary.main};
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;
  `,
};

export { sizeStyles, roundedStyles, variantStyles };
