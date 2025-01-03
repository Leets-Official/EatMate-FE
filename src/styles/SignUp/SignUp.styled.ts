import styled, { css } from 'styled-components';

interface InputFieldProps extends React.ComponentProps<'input'> {
  error: boolean;
  width?: string;
}

export const MainTitle = styled.div`
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.bold};
  font-size: ${({ theme }) => theme.FONT_SIZE.xl};
  padding: 10px 30px;
`;

export const Description = styled.div`
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.semibold};
  font-size: ${({ theme }) => theme.FONT_SIZE.smMd};
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 10px 28px;
`;

export const InputField = styled.input<InputFieldProps>`
  width: ${({ width }) => width || '300px'};
  padding: 8px;
  font-size: ${({ theme }) => theme.FONT_SIZE.lg};
  border: none;
  border-bottom: 2px solid ${({ theme }) => theme.COLORS.black};
  outline: none;
  transition: border-color 0.3s;
  text-align: center;

  &::placeholder {
    color: ${({ theme }) => theme.COLORS.gray[100]};
    font-size: ${({ theme }) => theme.FONT_SIZE.lg};
    text-align: left;
  }

  &:focus {
    border-bottom-color: ${({ theme }) => theme.COLORS.main};
  }
`;

export const InputContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin: 3rem 0 7.5rem 0;
`;

export const ButtonContainer = styled.div`
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
`;

export const SelectButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1rem;
  align-items: center;
  justify-content: center;
`;

export const Text = styled.div`
  font-size: ${({ theme }) => theme.FONT_SIZE.lg};
`;

export const ErrorMessage = styled.span`
  margin-top: 4px;
  font-size: ${({ theme }) => theme.FONT_SIZE.sm};
  color: ${({ theme }) => theme.COLORS.error};
`;
