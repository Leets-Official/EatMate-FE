import { css } from 'styled-components';

export type ButtonVariant =
  | 'primary'
  | 'primary-outline'
  | 'primary-outlineless';
export type ButtonSize = 'sm' | 'md' | 'lg';
export type ButtonRounded = 'none' | 'sm' | 'md';

const sizeStyles: Record<
  ButtonSize,
  (svgIcon: boolean) => ReturnType<typeof css>
> = {
  sm: (svgIcon) => css`
    width: 100px;
    font-size: 10px;
    padding: ${svgIcon ? '0.2rem 0.5rem' : '0.7rem 0.5rem'};
  `,
  md: (svgIcon) => css`
    width: 200px;
    font-size: 16px;
    padding: ${svgIcon ? '0.1rem 1.5rem' : '1rem 2rem'};
  `,
  lg: (svgIcon) => css`
    width: 330px;
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
    background-color: ${({ theme }) => theme.COLORS.main};
    color: ${({ theme }) => theme.COLORS.white};
    border: none;
    font-weight: ${({ theme }) => theme.FONT_WEIGHT.semibold};
  `,
  'primary-outline': css`
    background-color: ${({ theme }) => theme.COLORS.white};
    font-weight: ${({ theme }) => theme.FONT_WEIGHT.semibold};
    color: ${({ theme }) => theme.COLORS.main};
    border: 1px solid ${({ theme }) => theme.COLORS.main};
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;
  `,
  'primary-outlineless': css`
    background-color: ${({ theme }) => theme.COLORS.white};
    color: ${({ theme }) => theme.COLORS.main};
    border: none;
    font-weight: ${({ theme }) => theme.FONT_WEIGHT.semibold};
  `,
};

export { sizeStyles, roundedStyles, variantStyles };
