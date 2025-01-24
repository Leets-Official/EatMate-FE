import styled from 'styled-components';
import { FlexAll, flexColumn } from '@/styles/CommonStyle';

export const Container = styled.div`
  min-height: 100vh;
  position: relative;
  ${FlexAll}
`;

export const MainText = styled.div`
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.bold};
  font-size: ${({ theme }) => theme.FONT_SIZE.xl};
  margin-top: 120px;
  flex: 1;
`;

export const SubText = styled.div`
  font-size: ${({ theme }) => theme.FONT_SIZE.smMd};
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.semibold};
  margin-top: 15px;
`;

export const ContentWrapper = styled.div`
  ${flexColumn}
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
