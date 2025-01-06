import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import homeIcon from '@/assets/images/ic_home.svg';
import participantsIcon from '@/assets/images/ic_people.svg';
import myPageIcon from '@/assets/images/EatMate_circle_logo.svg';

const NavContainer = styled.div`
  position: fixed;
  bottom: 0;
  max-width: 390px;
  width: 100%;
  height: 70px;
  margin: 0 auto;
  background-color: #ffffff;
  display: flex;
  justify-content: space-around;
  align-items: center;
  box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.1);
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  z-index: 10;
`;

const NavItem = styled.div<{ isActive: boolean }>`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  cursor: pointer;
  transition: color 0.2s;

  ${({ isActive }) =>
    isActive
      ? css`
          color: #ff914d;

          img {
            filter: brightness(1.2) saturate(1.5); /* 선택된 상태에서 색상 강조 */
          }
        `
      : css`
          color: #aaa;

          img {
            filter: brightness(0.8); /* 기본 상태에서 색상 약간 어둡게 */
          }
        `}

  font-size: 12px;
  font-weight: bold;
`;

const Icon = styled.img`
  width: 24px;
  height: 24px;
`;

const BottomNavigation = () => {
  const [activeTab, setActiveTab] = useState(0);

  const navItems = [
    { label: '홈', icon: homeIcon },
    { label: '참여모임', icon: participantsIcon },
    { label: '마이페이지', icon: myPageIcon },
  ];

  return (
    <NavContainer>
      {navItems.map((item, index) => (
        <NavItem
          key={index}
          isActive={activeTab === index}
          onClick={() => setActiveTab(index)}
        >
          <Icon src={item.icon} alt={item.label} />
          <span>{item.label}</span>
        </NavItem>
      ))}
    </NavContainer>
  );
};

export default BottomNavigation;
