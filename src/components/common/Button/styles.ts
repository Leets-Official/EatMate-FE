import { css } from 'styled-components';

export type ButtonVariant = 'primary' | 'primary-outline';
export type ButtonSize = 'sm' | 'md' | 'lg';
export type ButtonRounded = 'none' | 'sm' | 'md';

const sizeStyles: Record<
  ButtonSize,
  (svgIcon: boolean) => ReturnType<typeof css>
> = {
  sm: (svgIcon) => css`
    width: 100px;
    font-size: 10px;
    padding: ${svgIcon ? '0.3rem 1.2rem' : '0.8rem 1rem'};
  `,
  md: (svgIcon) => css`
    width: 200px;
    font-size: 16px;
    padding: ${svgIcon ? '0.3rem 1.5rem' : '0.7rem 1.5rem'};
  `,
  lg: (svgIcon) => css`
    width: 400px;
    padding: ${svgIcon ? '0.3rem 1.5rem' : '1rem 1.5rem'};
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
