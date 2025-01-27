import Header from '@/components/common/Header/Header';
import { faqConstants } from '@/constants/faqConstants';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import icArrowDown from '@/assets/images/ic_arrow_down.svg';
import { useState } from 'react';

const FaqWrapper = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const QuestionContainer = styled.div<{ isOpen: boolean }>`
  border-bottom: 1px solid ${({ theme }) => theme.COLORS.gray[100]};
  padding: 15px 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const QuestionText = styled.div`
  font-size: ${({ theme }) => theme.FONT_SIZE.md};
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.light};
  display: flex;
  align-items: center;
  gap: 10px;
`;

const AnswerContainer = styled.div<{ isOpen: boolean }>`
  max-height: ${({ isOpen }) => (isOpen ? '100px' : '0')};
  overflow: hidden;
  transition: max-height 0.3s ease-in-out;
  padding: ${({ isOpen }) => (isOpen ? '10px 0' : '0')};
  font-size: ${({ theme }) => theme.FONT_SIZE.sm};
  color: ${({ theme }) => theme.COLORS.gray[500]};
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
          <div key={index}>
            <QuestionContainer
              isOpen={openIndex === index}
              onClick={() => toggleAnswer(index)}
            >
              <QuestionText>
                <span>Q</span>
                {faq.question}
              </QuestionText>
              <ArrowIcon
                src={icArrowDown}
                alt="toggle"
                isOpen={openIndex === index}
              />
            </QuestionContainer>
            <AnswerContainer isOpen={openIndex === index}>
              {faq.answer}
            </AnswerContainer>
          </div>
        ))}
      </FaqWrapper>
    </>
  );
};

export default Faq;
