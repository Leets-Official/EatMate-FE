import React from 'react';
import styled, { css } from 'styled-components';
import theme from '@/styles/theme';

interface TabItem {
  id: string;
  label: string;
}

interface TabProps {
  tabs: TabItem[];
  onTabClick: (id: string) => void;
  selectedTabId: string;
}

const TabContainer = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #ddd;
`;

const Tab = styled.div<{ isSelected: boolean }>`
  flex: 1;
  text-align: center;
  padding: 6px 0;
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

const Tabs: React.FC<TabProps> = ({ tabs, onTabClick, selectedTabId }) => {
  return (
    <TabContainer>
      {tabs.map((tab) => (
        <Tab
          key={tab.id}
          isSelected={selectedTabId === tab.id}
          onClick={() => onTabClick(tab.id)}
        >
          {tab.label}
        </Tab>
      ))}
    </TabContainer>
  );
};

export default Tabs;
