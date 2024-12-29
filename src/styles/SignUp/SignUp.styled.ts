import styled from 'styled-components';

interface InputFieldProps {
  error: boolean;
  width?: string;
}

export const MainTitle = styled.div`
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.bold};
  font-size: 24px;
  padding: 10px;
`;

export const Description = styled.div`
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.semibold};
  font-size: 14px;
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 10px;
`;

export const InputField = styled.input<InputFieldProps>`
  width: ${({ width }) => width || '100%'};
  padding: 8px;
  font-size: 16px;
  border: none;
  border-bottom: 2px solid
    ${({ theme, error }) => (error ? theme.COLORS.error : theme.COLORS.gray)};
  outline: none;
  transition: border-color 0.3s;

  &::placeholder {
    color: ${({ theme }) => theme.COLORS.primary.gray[100]};
    font-size: 20px;
  }

  &:focus {
    border-bottom-color: ${({ theme }) => theme.COLORS.primary.main};
  }
`;

export const InputContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Text = styled.div`
  font-size: 20px;
`;
export const ErrorMessage = styled.span`
  margin-top: 4px;
  font-size: 12px;
  color: ${({ theme }) => theme.COLORS.error};
`;
