import styled from 'styled-components';
import { flexCenter } from '../CommonStyle';

export const TotalContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
`;

export const PickerWrapper = styled.div`
  ${flexCenter}
  position: relative;
  gap: 16px;
  width: 100%;
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

export const Item = styled.li<{
  isSelected: boolean;
  isMinute?: boolean;
  showDatePicker?: boolean;
}>`
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
  border-top: ${({ isSelected, isMinute, showDatePicker, theme }) =>
    isMinute && !showDatePicker
      ? 'none'
      : isSelected
        ? `1px solid ${theme.COLORS.gray[50]}`
        : 'none'};
  border-bottom: ${({ isSelected, theme }) =>
    isSelected ? `1px solid ${theme.COLORS.gray[50]}` : 'none'};
  transition: all 0.3s ease;
`;

export const Label = styled.label`
  font-size: ${({ theme }) => theme.FONT_SIZE.smMd};
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.light};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const SelectedTime = styled.div`
  color: ${({ theme }) => theme.COLORS.main};
  font-size: ${({ theme }) => theme.FONT_SIZE.sm};
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.light};
`;

export const AdditionalText = styled.div`
  font-size: ${({ theme }) => theme.FONT_SIZE.sm};
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.light};
  color: ${({ theme }) => theme.COLORS.black};
  margin-left: 10px;
  white-space: nowrap;
`;
