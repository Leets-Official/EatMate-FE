import styled from 'styled-components';
import { flexAlignCenter, flexCenter } from '../CommonStyle';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

export const ProfileWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  cursor: pointer;
`;

export const ProfileImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
`;

export const EditIconWrapper = styled.div`
  position: absolute;
  bottom: -10px;
  right: -5px;
  border-radius: 50%;
  padding: 5px;
`;

export const EditIcon = styled.img`
  width: 30px;
  height: 30px;
`;
export const GoogleIcon = styled.img`
  width: 32px;
  height: 32px;
`;

export const FormContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const GoogleText = styled.div`
  ${flexAlignCenter}
  font-size: ${({ theme }) => theme.FONT_SIZE.sm};
  margin-top: -30px;
`;

export const ButtonContainer = styled.div`
  width: 100%;
  ${flexCenter}
  margin-top: 30px;
`;
