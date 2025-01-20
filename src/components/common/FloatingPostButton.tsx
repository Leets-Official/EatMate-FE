import styled from 'styled-components';
import { useState } from 'react';
import addIcon from '@/assets/images/ic_plus.svg';
import closeIcon from '@/assets/images/ic_close.svg';
import mealIcon from '@/assets/images/ic_posting_meal.svg';
import drinkIcon from '@/assets/images/ic_posting_beer.svg';
import deliveryIcon from '@/assets/images/ic_posting_delivery.svg';
import theme from '@/styles/theme';
import { useNavigate } from 'react-router-dom';

const Wrapper = styled.div`
  position: fixed;
  display: flex;
  justify-content: end;
  bottom: 90px;
  width: 190%;
  max-width: 390px;
  margin: 0 auto;
  z-index: 999;
`;

const ButtonContainer = styled.button<{ isMenuOpen?: boolean }>`
  width: 40px;
  height: 40px;
  margin-right: 20px;
  border-radius: 50%;
  background-color: ${({ isMenuOpen, theme }) =>
    isMenuOpen ? '#4B4B4B' : theme.COLORS.main};
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
  border: none;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    opacity: 0.9;
  }

  &:active {
    background-color: ${({ isMenuOpen }) =>
      isMenuOpen ? '#3B3B3B' : '#d66f2b'};
  }
`;

const Icon = styled.img`
  width: 20px;
  height: 20px;
`;

const Overlay = styled.div<{ isVisible: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: ${({ isVisible }) => (isVisible ? 'block' : 'none')};
  transition: opacity 0.3s ease-in-out;
  z-index: 100;
`;

const Menu = styled.div`
  position: fixed;
  bottom: 140px;
  right: 30px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  align-items: flex-end;
  z-index: 999;
`;

const MenuItem = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 12px;
  background-color: transparent;
  color: ${theme.COLORS.white};
  padding: 10px 16px;
  border-radius: 30px;
  border: none;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    opacity: 0.9;
  }

  img {
    width: 22px;
    height: 22px;
  }
`;

const FloatingPostButton = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleButtonClick = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  return (
    <>
      <Wrapper>
        <ButtonContainer onClick={handleButtonClick} isMenuOpen={isMenuOpen}>
          <Icon src={isMenuOpen ? closeIcon : addIcon} alt="Toggle Menu" />
        </ButtonContainer>
      </Wrapper>
      <Overlay isVisible={isMenuOpen} onClick={handleButtonClick} />
      {isMenuOpen && (
        <Menu>
          <MenuItem onClick={() => handleNavigation('/meal')}>
            밥약
            <ButtonContainer onClick={handleButtonClick}>
              <Icon src={mealIcon} alt="밥약" />
            </ButtonContainer>
          </MenuItem>
          <MenuItem onClick={() => handleNavigation('/drink')}>
            밥약
            <ButtonContainer onClick={handleButtonClick}>
              <Icon src={drinkIcon} alt="술약약" />
            </ButtonContainer>
          </MenuItem>
          <MenuItem onClick={() => handleNavigation('/delivery')}>
            배달팟
            <ButtonContainer onClick={handleButtonClick}>
              <Icon src={deliveryIcon} alt="술약약" />
            </ButtonContainer>
          </MenuItem>
        </Menu>
      )}
    </>
  );
};

export default FloatingPostButton;
