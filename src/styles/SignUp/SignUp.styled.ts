import styled from 'styled-components';

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
