import styled from 'styled-components';

export const StyledInput = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  font-size: ${({ theme }) => theme.FONT_SIZE.sm};
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.light};
  &::placeholder {
    color: ${({ theme }) => theme.COLORS.gray[200]};
  }
  border: 1px solid ${({ theme }) => theme.COLORS.gray[300]};
  border-radius: 8px;
  resize: ${({ as }) => (as === 'textarea' ? 'none' : 'initial')};
`;

export const Label = styled.div`
  font-size: ${({ theme }) => theme.FONT_SIZE.smMd};
`;

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
`;

export const ErrorContainer = styled.span`
  font-size: ${({ theme }) => theme.FONT_SIZE.sm};
  color: ${({ theme }) => theme.COLORS.error};
  margin-top: 10px;
  padding-left: 2.5rem;
  display: flex;
  align-items: center;
  gap: 10px;
`;
