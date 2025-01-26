import styled from 'styled-components';
import CheckIcon from '@/assets/images/ic_option_check.svg?react';
interface InputGuideProps {
  message: string | string[];
  margin?: string;
}

interface GuideContainerProps {
  margin?: string;
}

const GuideContainer = styled.div<GuideContainerProps>`
  display: flex;
  align-items: center;
  gap: 6px;
  color: ${({ theme }) => theme.COLORS.gray[400]};
  font-size: ${({ theme }) => theme.FONT_SIZE.xs};
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.light};
  margin-top: ${({ margin }) => (margin ? margin : '-2px')};
`;

const InputGuide: React.FC<InputGuideProps> = ({ message, margin }) => {
  return (
    <GuideContainer margin={margin}>
      <CheckIcon />
      {message}
    </GuideContainer>
  );
};

export default InputGuide;
