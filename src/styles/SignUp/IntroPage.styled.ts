import styled from 'styled-components';
import { flexColumn } from '@/styles/CommonStyle';

export const MainText = styled.span<{ color?: string }>`
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.light};
  font-size: ${({ theme }) => theme.FONT_SIZE.title};
  color: ${({ color, theme }) =>
    color ? theme.COLORS[color] : theme.COLORS.black};
  line-height: 1.6;
`;

export const SubText = styled.div`
  font-size: ${({ theme }) => theme.FONT_SIZE.lg};
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.bold};
  color: ${({ theme }) => theme.COLORS.main};
`;

export const ContentWrapper = styled.div`
  position: absolute;
  top: 15%;
  left: 36%;
  transform: translateX(-50%);
  ${flexColumn}
  text-align: center;
`;

export const ButtonWrapper = styled.div`
  position: absolute;
  bottom: 3px;
  padding: 20px;
  width: 100%;
  display: flex;
  justify-content: center;
`;
