import styled from "styled-components";

export const Container = styled.div`
  min-height: 100vh;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

export const MainText = styled.div`
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.bold};
  font-size: 24px;
  margin-top: 120px;
  flex: 1;
`;

export const SubText = styled.div`
  font-size: 14px;
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.semibold};
  margin-top: 15px;
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ButtonWrapper = styled.div`
  position: absolute;
  bottom: 20px;
  padding: 20px;
  width: 100%;
  display: flex;
  justify-content: center;
`;