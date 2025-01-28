import styled from 'styled-components';
import { flexCenter, flexColumnCenter } from '@/styles/CommonStyle';

interface InputFieldProps extends React.ComponentProps<'input'> {
  error: boolean;
  width?: string;
}

export const MainTitle = styled.div`
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.bold};
  font-size: ${({ theme }) => theme.FONT_SIZE.xl};
  padding: 40px 30px;
`;

export const Description = styled.div<{ padding?: string }>`
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.light};
  font-size: ${({ theme }) => theme.FONT_SIZE.sm};
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: ${({ padding }) => padding || '10px'};
`;

export const InputField = styled.input<InputFieldProps>`
  width: ${({ width }) => width || '330px'};
  padding: 10px;
  background-color: ${({ theme }) => theme.COLORS.gray[5]};
  font-size: ${({ theme }) => theme.FONT_SIZE.lg};
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.bold};
  border: none;
  border-radius: 8px;
  outline: none;
  transition: border-color 0.3s;

  &::placeholder {
    color: ${({ theme }) => theme.COLORS.gray[20]};
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
  position: relative;
  width: 160px;
  height: 160px;
  ${flexCenter}
  margin: 0 auto;
`;

export const ProfileImage = styled.div<{ imageUrl: string }>`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: ${({ imageUrl }) => `url(${imageUrl})`} no-repeat center/cover;
  cursor: pointer;
`;

export const EditIconWrapper = styled.div`
  position: absolute;
  bottom: 5px;
  right: 5px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

export const EditIcon = styled.img`
  width: 40px;
  height: 40px;
`;

export const HiddenFileInput = styled.input`
  display: none;
`;

export const Padding = styled.div`
  padding-left: 30px;
`;
