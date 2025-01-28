import Header from '@/components/common/Header/Header';
import { faqConstants } from '@/constants/faqConstants';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import icArrowDown from '@/assets/images/ic_arrow_down.svg';
import { useState } from 'react';
import { Text } from '@/styles/mypage/mypage.styled';

const FaqWrapper = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const FaqItem = styled.div<{ isOpen: boolean }>`
  background-color: ${({ theme, isOpen }) =>
    isOpen ? theme.COLORS.white : theme.COLORS.orange[50]};
  border-radius: 12px;
  overflow: hidden;
  transition:
    background-color 0.3s ease-in-out,
    max-height 0.4s ease-in-out;
`;

const QuestionContainer = styled.div<{ isOpen: boolean }>`
  background-color: ${({ isOpen, theme }) =>
    isOpen ? '#fcebcb' : theme.COLORS.orange[50]};
  padding: 15px 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const QuestionText = styled.div`
  font-size: ${({ theme }) => theme.FONT_SIZE.smMd};
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.light};
  display: flex;
  align-items: center;
  gap: 10px;
`;

const AnswerContainer = styled.div<{ isOpen: boolean }>`
  background-color: ${({ isOpen }) => (isOpen ? '#fbf2e3' : 'none')};
  max-height: ${({ isOpen }) => (isOpen ? '200px' : '0')};
  opacity: ${({ isOpen }) => (isOpen ? '1' : '0')};
  transition:
    max-height 0.4s ease-in-out,
    opacity 0.3s ease-in-out;
  padding: ${({ isOpen }) => (isOpen ? '15px 10px' : '0 10px')};
  font-size: ${({ theme }) => theme.FONT_SIZE.sm};
`;

const ArrowIcon = styled.img<{ isOpen: boolean }>`
  transform: ${({ isOpen }) => (isOpen ? 'rotate(180deg)' : 'rotate(0deg)')};
  transition: transform 0.3s ease-in-out;
  width: 20px;
  height: 20px;
`;

const Faq: React.FC = () => {
  const nav = useNavigate();
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const toggleAnswer = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  return (
    <>
      <Header onBackClick={() => nav(-1)} showBackButton title="FAQ" />
      <FaqWrapper>
        {faqConstants.map((faq, index) => (
          <FaqItem key={index} isOpen={openIndex === index}>
            <QuestionContainer
              isOpen={openIndex === index}
              onClick={() => toggleAnswer(index)}
            >
              <QuestionText>
                <Text color="main" fontSize="md">
                  Q :
                </Text>
                {faq.question}
              </QuestionText>
              <ArrowIcon
                src={icArrowDown}
                alt="toggle"
                isOpen={openIndex === index}
              />
            </QuestionContainer>
            <AnswerContainer isOpen={openIndex === index}>
              <span>A : </span>
              {faq.answer}
            </AnswerContainer>
          </FaqItem>
        ))}
      </FaqWrapper>
    </>
  );
};

export default Faq;
