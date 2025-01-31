import { flexAlignCenter, flexColumn } from '@/styles/CommonStyle';
import styled from 'styled-components';

export const StyledInput = styled.input<{
  hasError?: boolean;
  readOnly?: boolean;
  keepBackground?: boolean;
}>`
  width: 100%;
  padding: 10px;
  font-size: ${({ theme }) => theme.FONT_SIZE.sm};
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.light};
  border-radius: 8px;
  border: 1px solid
    ${({ theme, hasError }) =>
      hasError ? theme.COLORS.error : theme.COLORS.gray[300]};
  resize: ${({ as }) => (as === 'textarea' ? 'none' : 'initial')};
  &::placeholder {
    color: ${({ theme }) => theme.COLORS.gray[200]};
  }
  &:focus {
    border-color: ${({ theme }) => theme.COLORS.main};
    outline: none;
  }
  background-color: ${({ readOnly, keepBackground }) =>
    readOnly ? (keepBackground ? '#e9e9e9' : 'transparent') : 'transparent'};
  color: ${({ readOnly }) => (readOnly ? '#848484' : '#000')};

  cursor: ${({ readOnly, keepBackground }) =>
    readOnly ? (keepBackground ? 'default' : 'pointer') : 'text'};
`;

export const Label = styled.div<{ hasError?: boolean }>`
  font-size: ${({ theme }) => theme.FONT_SIZE.smMd};
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.light};
  color: ${({ theme, hasError }) =>
    hasError ? theme.COLORS.error : theme.COLORS.black};
`;

export const InputWrapper = styled.div<{ marginBottom?: string }>`
  ${flexColumn}
  gap: 10px;
  margin-bottom: ${({ marginBottom }) => marginBottom || '30px'};
`;

export const ErrorContainer = styled.span`
  ${flexAlignCenter}
  font-size: ${({ theme }) => theme.FONT_SIZE.sm};
  color: ${({ theme }) => theme.COLORS.error};
  margin-top: 10px;
  gap: 10px;
`;
