import { flexAlignCenter, flexColumn } from '@/styles/CommonStyle';
import styled from 'styled-components';

export const StyledInput = styled.input`
  width: 100%;
  padding: 10px;
  font-size: ${({ theme }) => theme.FONT_SIZE.sm};
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.light};
  border: 1px solid ${({ theme }) => theme.COLORS.gray[300]};
  border-radius: 8px;
  resize: ${({ as }) => (as === 'textarea' ? 'none' : 'initial')};
  &::placeholder {
    color: ${({ theme }) => theme.COLORS.gray[200]};
  }
  &:focus {
    border-color: ${({ theme }) => theme.COLORS.main};
    outline: none;
  }
`;

export const Label = styled.div`
  font-size: ${({ theme }) => theme.FONT_SIZE.smMd};
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.light};
`;

export const InputWrapper = styled.div`
  ${flexColumn}
  gap: 10px;
  margin-bottom: 30px;
`;

export const ErrorContainer = styled.span`
  ${flexAlignCenter}
  font-size: ${({ theme }) => theme.FONT_SIZE.sm};
  color: ${({ theme }) => theme.COLORS.error};
  margin-top: 10px;
  padding-left: 2.5rem;
  gap: 10px;
`;
