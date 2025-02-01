import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled, { css } from 'styled-components';
import homeIcon from '@/assets/images/ic_home.svg';
import homeIconActive from '@/assets/images/ic_home_color.svg';
import participantsIcon from '@/assets/images/ic_people.svg';
import participantsIconActive from '@/assets/images/ic_people_color.svg';
import myPageIcon from '@/assets/images/ic_navi_logo.svg';
import mypageIconActive from '@/assets/images/ic_navi_logo_color.svg';
import theme from '@/styles/theme';

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
          color: ${theme.COLORS.main};
        `
      : css`
          color: ${theme.COLORS.gray[300]};
        `}

  font-size: 12px;
  font-weight: bold;
`;

const Icon = styled.img`
  width: 24px;
  height: 24px;
`;

const BottomNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    const path = location.pathname;
    const tabIndex = {
      '/home': 0,
      '/participants': 1,
      '/mypage': 2,
    }[path];
    if (tabIndex !== undefined) {
      setActiveTab(tabIndex);
    }
  }, [location]);

  const navItems = [
    { label: '홈', icon: homeIcon, activeIcon: homeIconActive, path: '/home' },
    {
      label: '참여모임',
      icon: participantsIcon,
      activeIcon: participantsIconActive,
      path: '/participating-meetings',
    },
    {
      label: '마이페이지',
      icon: myPageIcon,
      activeIcon: mypageIconActive,
      path: '/mypage',
    },
  ];

  return (
    <NavContainer>
      {navItems.map((item, index) => (
        <NavItem
          key={index}
          isActive={activeTab === index}
          onClick={() => {
            setActiveTab(index);
            navigate(item.path);
          }}
        >
          <Icon
            src={activeTab === index ? item.activeIcon : item.icon}
            alt={item.label}
          />
          <span>{item.label}</span>
        </NavItem>
      ))}
    </NavContainer>
  );
};

export default BottomNavigation;
