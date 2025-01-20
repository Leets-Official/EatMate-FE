import styled from 'styled-components';
import { useState } from 'react';
import addIcon from '@/assets/images/ic_plus.svg';
import closeIcon from '@/assets/images/ic_close.svg';
import mealIcon from '@/assets/images/ic_posting_meal.svg';
import drinkIcon from '@/assets/images/ic_posting_beer.svg';
import deliveryIcon from '@/assets/images/ic_posting_delivery.svg';
import { useNavigate } from 'react-router-dom';

const Wrapper = styled.div`
  position: fixed;
  display: flex;
  justify-content: end;
  bottom: 90px;
  width: 100%;
  max-width: 390px;
  margin: 0 auto;
  z-index: 105;
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
    background-color: ${({ isMenuOpen, theme }) =>
      isMenuOpen ? '#3B3B3B' : theme.COLORS.main};
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
  flex-direction: column-reverse;
  gap: 14px;
  align-items: flex-end;
  z-index: 105;
  position: fixed;
  display: flex;
  justify-content: end;
  bottom: 150px;
  width: 100%;
  max-width: 390px;
  margin: 0 auto;
  z-index: 105;
`;

const MenuItem = styled.button`
  display: flex;
  align-items: center;
  gap: 12px;
  background-color: transparent;
  color: ${({ theme }) => theme.COLORS.white};
  border-radius: 30px;
  border: none;
  font-size: 16px;
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.light};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    opacity: 0.9;
  }

  img {
    width: 25px;
    height: 25px;
  }
`;

const FloatingPostButton = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleButtonClick = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleNavigation = (type: 'meal' | 'drink' | 'delivery') => {
    let path = '/meeting/create/offline';
    if (type === 'delivery') {
      path = '/meeting/create/delivery';
    } else {
      path += `?category=${type === 'meal' ? 'meal' : 'drink'}`;
    }
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
          <MenuItem onClick={() => handleNavigation('delivery')}>
            배달팟
            <ButtonContainer onClick={handleButtonClick}>
              <Icon src={deliveryIcon} alt="배달팟" />
            </ButtonContainer>
          </MenuItem>
          <MenuItem onClick={() => handleNavigation('drink')}>
            술약
            <ButtonContainer onClick={handleButtonClick}>
              <Icon src={drinkIcon} alt="술약" />
            </ButtonContainer>
          </MenuItem>
          <MenuItem onClick={() => handleNavigation('meal')}>
            밥약
            <ButtonContainer onClick={handleButtonClick}>
              <Icon src={mealIcon} alt="밥약" />
            </ButtonContainer>
          </MenuItem>
        </Menu>
      )}
    </>
  );
};

export default FloatingPostButton;
