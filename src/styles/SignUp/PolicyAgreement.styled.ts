import styled, { keyframes } from 'styled-components';
import { flexColumn } from '@/styles/CommonStyle';

export const SlideUp = keyframes`
    from {
        transform: translateY(100%);
    }
    to {
        transform: translateY(0);
    }
`;

export const Overlay = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.57);
  z-index: 1000;
  position: fixed;
  top: 0;
  left: 0;
`;

export const ModalContainer = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 270px;
  background-color: ${({ theme }) => theme.COLORS.main};
  border-top-right-radius: 30px;
  border-top-left-radius: 30px;
  animation: ${SlideUp} 0.3s ease-out;
  padding: 20px;
  z-index: 1100;
`;

export const Title = styled.div`
  font-size: ${({ theme }) => theme.FONT_SIZE.smMd};
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.light};
  color: ${({ theme }) => theme.COLORS.white};
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  cursor: pointer;
  gap: 10px;
`;

export const TermList = styled.div`
  ${flexColumn}
  justify-content: center;
  gap: 15px;
  margin: 40px 20px;
`;

export const TermItem = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  gap: 10px;
  font-size: ${({ theme }) => theme.FONT_SIZE.smMd};
  color: ${({ theme }) => theme.COLORS.white};
  justify-content: space-between;
`;

export const CheckImage = styled.img`
  width: 20px;
  height: 20px;
`;

export const Bar = styled.div`
  border: 1px solid ${({ theme }) => theme.COLORS.white};
`;

export const Container = styled.div`
  padding: 20px 30px;
  line-height: 1.7;
`;

export const Text = styled.p`
  font-size: ${({ theme }) => theme.FONT_SIZE.smMd};
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.light};
  line-height: 1.6;
`;

export const TitleItem = styled.h2`
  font-size: ${({ theme }) => theme.FONT_SIZE.smMd};
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.light};
  margin-top: 30px;
`;

export const Section = styled.h3`
  font-size: ${({ theme }) => theme.FONT_SIZE.smMd};
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.light};
  margin-top: 20px;
`;

export const SubItem = styled.p`
  font-size: ${({ theme }) => theme.FONT_SIZE.smMd};
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.light};
  margin-left: 15px;
  margin-bottom: 5px;
`;

export const Line = styled.div`
  border: 1px solid ${({ theme }) => theme.COLORS.gray[300]};
`;

export const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${({ theme }) => theme.COLORS.black};
  margin: 30px 0;
`;

export const FinalNotice = styled.div`
  font-size: ${({ theme }) => theme.FONT_SIZE.sm};
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.light};
  text-align: center;
  margin-top: 10px;
`;
