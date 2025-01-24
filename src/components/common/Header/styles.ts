import { flexColumn } from '@/styles/CommonStyle';
import styled from 'styled-components';

export const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px;
  padding: 0 16px;
  background-color: ${({ theme }) => theme.COLORS.white};
  position: relative;
`;

export const BackButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;

  img {
    width: 24px;
    height: 24px;
  }
`;

export const CenterContainer = styled.div`
  ${flexColumn}
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Title = styled.h1`
  font-size: 18px;
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.bold};
  color: ${({ theme }) => theme.COLORS.text};
`;

export const SubText = styled.span`
  margin-top: 4px;
  font-size: 14px;
  color: ${({ theme }) => theme.COLORS.textSecondary};
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;

  img {
    width: 16px;
    height: 16px;
  }
`;

export const RightSpacer = styled.div`
  width: 40px;
`;

export const LeaveButton = styled.button`
  font-size: ${({ theme }) => theme.FONT_SIZE.md};
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.large};
  color: ${({ theme }) => theme.COLORS.main};
  background-color: transparent;
  cursor: pointer;
  transition: background-color 0.3s ease;
  border: none;
`;
