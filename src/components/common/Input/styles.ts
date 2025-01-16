import styled from 'styled-components';

export const StyledInput = styled.input`
  width: 100%;
  padding: 10px;
  font-size: ${({ theme }) => theme.FONT_SIZE.sm};
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.light};
  &::placeholder {
    color: ${({ theme }) => theme.COLORS.gray[200]};
  }
  border: 1px solid ${({ theme }) => theme.COLORS.gray[300]};
  border-radius: 8px;
  resize: ${({ as }) => (as === 'textarea' ? 'none' : 'initial')};
`;
