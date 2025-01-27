import styled from 'styled-components';

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
`;

export const ProfileImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
`;

export const EditIconWrapper = styled.div`
  position: absolute;
  bottom: 5px;
  right: 5px;
  background-color: white;
  border-radius: 50%;
  padding: 5px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  cursor: pointer;
`;

export const EditIcon = styled.img`
  width: 24px;
  height: 24px;
`;

export const FormContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const GoogleText = styled.div`
  font-size: ${({ theme }) => theme.FONT_SIZE.sm};
  margin-top: -10px;
`;

export const ButtonContainer = styled.div`
  width: 100%;
  margin-top: 30px;
`;
