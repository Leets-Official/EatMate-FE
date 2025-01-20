import { flexCenter } from '@/styles/CommonStyle';
import { css } from 'styled-components';

export type ButtonVariant =
  | 'primary'
  | 'primary-outline'
  | 'primary-outlineless'
  | 'secondary-main'
  | 'secondary-white';
export type ButtonSize = 'sm' | 'md' | 'lg' | 'xl';
export type ButtonRounded = 'none' | 'sm' | 'md' | 'lg';

const sizeStyles: Record<
  ButtonSize,
  (svgIcon: boolean) => ReturnType<typeof css>
> = {
  sm: (svgIcon) => css`
    width: 100px;
    height: 43px;
    font-size: 14px;
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
  xl: (svgIcon) => css`
    width: 349px;
    height: 45px;
    padding: ${svgIcon ? '0.3rem 1.5rem' : '1rem 1.5rem'};
    font-size: 14px;
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
  lg: css`
    border-radius: 20px;
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
    ${flexCenter}
    background-color: ${({ theme }) => theme.COLORS.white};
    font-weight: ${({ theme }) => theme.FONT_WEIGHT.semibold};
    color: ${({ theme }) => theme.COLORS.main};
    border: 1px solid ${({ theme }) => theme.COLORS.main};
    gap: 8px;
  `,
  'primary-outlineless': css`
    background-color: ${({ theme }) => theme.COLORS.white};
    color: ${({ theme }) => theme.COLORS.main};
    border: none;
    font-weight: ${({ theme }) => theme.FONT_WEIGHT.semibold};
  `,
  'secondary-main': css`
    background-color: ${({ theme }) => theme.COLORS.orange[50]};
    color: ${({ theme }) => theme.COLORS.main};
    border: 1px solid ${({ theme }) => theme.COLORS.main};
  `,
  'secondary-white': css`
    background-color: ${({ theme }) => theme.COLORS.white};
    color: #636363;
    border: 1px solid ${({ theme }) => theme.COLORS.gray[50]};
    box-shadow: -3px -3px 20px 0px rgba(0, 0, 0, 0.11);
  `,
};

export { sizeStyles, roundedStyles, variantStyles };
