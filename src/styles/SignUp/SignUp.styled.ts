import styled from 'styled-components';
import { flexCenter, flexColumnCenter } from '@/styles/CommonStyle';

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
  ${flexCenter}
  gap: 1rem;
  margin-top: 3rem;
`;

export const ButtonContainer = styled.div`
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
`;

export const SelectButtonContainer = styled.div`
  ${flexColumnCenter}
  gap: 1rem;
  margin-top: 1rem;
`;

export const Text = styled.div`
  font-size: ${({ theme }) => theme.FONT_SIZE.lg};
`;

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 5rem;
`;

export const Container = styled.div`
  position: relative;
  min-height: 780px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

export const MainContent = styled.div`
  flex: 1;
  padding-bottom: 80px;
`;

export const ProfileImageContainer = styled.div`
  ${flexCenter}
  margin: 2rem 0;
`;

export const ProfileImage = styled.div<{ imageUrl: string }>`
  ${flexCenter}
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.COLORS.gray[200]};
  background-image: ${({ imageUrl }) =>
    imageUrl ? `url(${imageUrl})` : 'none'};
  background-size: cover;
  background-position: center;
  font-size: ${({ theme }) => theme.FONT_SIZE.xl};
  color: ${({ theme }) => theme.COLORS.gray[100]};
  cursor: pointer;
`;

export const HiddenFileInput = styled.input`
  display: none;
`;
