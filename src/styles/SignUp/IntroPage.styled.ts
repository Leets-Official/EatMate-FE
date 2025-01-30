import styled from 'styled-components';
import { flexCenter, flexColumn } from '@/styles/CommonStyle';

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
  ${flexColumn}
  height: 40vh;
  margin-top: 10vh;
  padding: 30px;
`;

export const ProfileIconsWrapper = styled.div`
  ${flexCenter}
  position: relative;
  gap: 5px;
  overflow: hidden;
  margin-top: 15vh;
`;

export const ProfileIcon = styled.img`
  width: 110px;
  height: 110px;
  border-radius: 50%;
  object-fit: cover;

  margin: 0 calc(15px - 5px);

  &:first-child {
    margin-left: 60px;
  }

  &:last-child {
    margin-left: 15px;
  }
`;

export const Icon = styled.img`
  width: 50px;
  height: 50px;
  padding: 5px;
`;
