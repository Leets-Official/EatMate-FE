import React from 'react';
import styled, { css } from 'styled-components';
import theme from '@/styles/theme';
interface TabProps {
  tabs: string[];
  onTabClick: (index: number) => void;
  selectedIndex: number;
}

const TabContainer = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #ddd;
`;

const Tab = styled.div<{ isSelected: boolean }>`
  flex: 1;
  text-align: center;
  padding: 12px 0;
  font-size: 16px;
  font-weight: bold;
  color: ${({ isSelected, theme }) =>
    isSelected ? `${theme.COLORS.main}` : `${theme.COLORS.gray[300]}`};
  cursor: pointer;

  ${({ isSelected }) =>
    isSelected &&
    css`
      border-bottom: 3px solid ${theme.COLORS.main};
    `}
`;

const Tabs: React.FC<TabProps> = ({ tabs, onTabClick, selectedIndex }) => {
  return (
    <TabContainer>
      {tabs.map((tab, index) => (
        <Tab
          key={index}
          isSelected={selectedIndex === index}
          onClick={() => onTabClick(index)}
        >
          {tab}
        </Tab>
      ))}
    </TabContainer>
  );
};

export default Tabs;
