import styled from 'styled-components';

export const TotalContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
`;

export const PickerWrapper = styled.div`
  position: relative;
  display: flex;
  gap: 16px;
  width: 100%;
  align-items: center;
  padding-bottom: 30px;
`;

export const ItemsContainer = styled.div<{ flex: number }>`
  flex: ${({ flex }) => flex};
`;

export const Items = styled.ul`
  height: 100px;
  padding: 30px 0;
  margin: 0;
  overflow-y: scroll;
  scroll-snap-type: y mandatory;
  -ms-overflow-style: none;
  scrollbar-width: none;
  text-align: center;
  font-size: ${({ theme }) => theme.FONT_SIZE.sm};
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.regular};

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const Item = styled.li<{ isSelected: boolean }>`
  list-style-type: none;
  height: 40px;
  line-height: 40px;
  scroll-snap-align: center;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ isSelected, theme }) =>
    isSelected ? theme.COLORS.main : '#000'};
  font-weight: ${({ isSelected, theme }) =>
    isSelected ? theme.FONT_WEIGHT.bold : theme.FONT_WEIGHT.regular};
  border-top: ${({ isSelected, theme }) =>
    isSelected ? `1px solid ${theme.COLORS.gray[50]}` : 'none'};
  border-bottom: ${({ isSelected, theme }) =>
    isSelected ? `1px solid ${theme.COLORS.gray[50]}` : 'none'};
  transition: all 0.3s ease;
`;

export const Label = styled.label`
  font-size: ${({ theme }) => theme.FONT_SIZE.md};
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.semibold};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const SelectedTime = styled.div`
  color: ${({ theme }) => theme.COLORS.main};
  font-size: ${({ theme }) => theme.FONT_SIZE.sm};
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.light};
`;
