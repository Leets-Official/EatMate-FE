import styled from 'styled-components';
import { flexCenter, flexColumn, flexColumnCenter } from '@/styles/CommonStyle';

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
  ${flexColumn}
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
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.bold};
`;

export const InputWrapper = styled.div`
  ${flexColumn}
  margin-bottom: 5rem;
`;

export const Container = styled.div`
  position: relative;
  min-height: 780px;
  ${flexColumn}
  overflow: hidden;
`;

export const MainContent = styled.div`
  flex: 1;
  padding-bottom: 80px;
`;

export const ProfileImageContainer = styled.div`
  ${flexCenter}
  position: relative;
  width: 160px;
  height: 160px;
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
  ${flexCenter}
  position: absolute;
  bottom: 5px;
  right: 5px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
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

export const GenderContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 40px;
  margin-top: 50px;
`;

export const GenderOption = styled.div<{ isSelected?: boolean }>`
  ${flexColumnCenter}
  width: 120px;
  height: 120px;
  border-radius: 27px;
  background: ${({ isSelected, theme }) =>
    isSelected ? theme.COLORS.orange[50] : theme.COLORS.white};
  box-shadow: ${({ isSelected }) =>
    isSelected
      ? '0px 4px 10px rgba(255, 102, 0, 0.2)'
      : '0px 2px 5px rgba(0, 0, 0, 0.1)'};
  border: 1px solid
    ${({ isSelected, theme }) =>
      isSelected ? theme.COLORS.main : theme.COLORS.gray[100]};
  cursor: pointer;
  transition: all 0.3s ease;

  span {
    margin-top: 10px;
    font-size: ${({ theme }) => theme.FONT_SIZE.md};
    color: ${({ theme }) => theme.COLORS.black};
  }

  &:hover {
    background: ${({ theme }) => theme.COLORS.orange[50]};
  }
`;

export const GenderIcon = styled.img`
  width: 50px;
  height: 50px;
`;
