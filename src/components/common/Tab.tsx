import React, { useState } from 'react';
import styled, { css } from 'styled-components';

interface TabProps {
  tabs: string[]; // 탭 이름 리스트
  onTabClick: (index: number) => void; // 탭 클릭 시 동작
  selectedIndex: number; // 선택된 탭의 인덱스
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
  color: ${({ isSelected }) => (isSelected ? '#FF914D' : '#aaa')};
  cursor: pointer;

  ${({ isSelected }) =>
    isSelected &&
    css`
      border-bottom: 3px solid #ff914d; /* 선택된 탭의 밑줄 */
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
