import theme from '@/styles/theme';
import React from 'react';
import styled from 'styled-components';
import CheckMark from '@/assets/images/ic_option_check.svg';

interface ModalProps {
  isOpen: boolean;
  title: string;
  options: { label: string; value: string; description?: string }[];
  selectedOption: string;
  onSelect: (value: string) => void;
  onClose: () => void;
  children?: React.ReactNode;
}

const Overlay = styled.div<{ isOpen: boolean }>`
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 10;
`;

const ModalContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 390px;
  background: ${({ theme }) => theme.COLORS.white};
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  z-index: 20;
  font-family: ${({ theme }) => theme.FONT_FAMILY.pretendard};
`;

const Title = styled.h2`
  font-size: 16px;
  font-weight: bold;
  margin: 16px 0 16px 0;
  text-align: center;
`;

const OptionList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

const Option = styled.li<{ selected: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  font-size: 14px;
  color: ${({ selected }) => (selected ? theme.COLORS.main : '#333')};
  font-weight: ${({ selected }) => (selected ? 'bold' : 'normal')};
  cursor: pointer;

  &:hover {
    background: #f8f8f8;
  }
`;

const OptionDescription = styled.div`
  font-size: 10px;
  color: #636363;
  margin-top: 6px;
`;

const CloseButton = styled.button`
  display: block;
  margin: 13px auto;
  width: 85%;
  padding: 12px;
  font-size: 14px;
  font-weight: 800;
  color: ${({ theme }) => theme.COLORS.white};
  background: ${({ theme }) => theme.COLORS.main};
  border: none;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    opacity: 0.7;
  }
`;

const FilterModal: React.FC<ModalProps> = ({
  isOpen,
  title,
  options,
  selectedOption,
  onSelect,
  onClose,
  children,
}) => {
  if (!isOpen) return null;

  return (
    <Overlay isOpen={isOpen}>
      <ModalContainer>
        <Title>{title}</Title>
        {children || (
          <OptionList>
            {options.map((option) => (
              <Option
                key={option.value}
                selected={selectedOption === option.value}
                onClick={() => onSelect(option.value)}
              >
                <div>
                  {option.label}
                  {option.description && (
                    <OptionDescription>{option.description}</OptionDescription>
                  )}
                </div>
                {selectedOption === option.value && (
                  <img src={CheckMark} alt="check" />
                )}
              </Option>
            ))}
          </OptionList>
        )}
        <CloseButton onClick={onClose}>닫기</CloseButton>
      </ModalContainer>
    </Overlay>
  );
};

export default FilterModal;
