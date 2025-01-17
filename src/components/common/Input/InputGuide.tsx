import styled from 'styled-components';
import CheckIcon from '@/assets/images/ic_checkIcon.svg?react';
interface InputGuideProps {
  message: string;
}

const GuideContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  color: ${({ theme }) => theme.COLORS.gray[400]};
  font-size: ${({ theme }) => theme.FONT_SIZE.sm};
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.light};
  margin-top: 20px;
`;

const InputGuide: React.FC<InputGuideProps> = ({ message }) => {
  return (
    <GuideContainer>
      <CheckIcon />
      {message}
    </GuideContainer>
  );
};

export default InputGuide;
