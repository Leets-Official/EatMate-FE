import styled from 'styled-components';

interface HeaderContainerProps {
  showBackButton: boolean;
}

export const HeaderContainer = styled.header<HeaderContainerProps>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1rem;
  height: 60px;
`;

export const BackButton = styled.button`
  position: relative;
  z-index: 10;
  background: none;
  border: none;
  font-size: 1.2rem;
  color: ${({ theme }) => theme.COLORS.primary.main};
  cursor: pointer;
`;

export const CenterContainer = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  left: 50%;
  transform: translateX(-50%);
`;

export const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.bold};
  color: ${({ theme }) => theme.COLORS.text};
`;

export const SubText = styled.span`
  margin-top: 10px;
  font-size: 1rem;
  color: ${({ theme }) => theme.COLORS.textSecondary};
`;

export const RightSpacer = styled.div`
  width: 40px;
`;
