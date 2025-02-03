import { useState } from 'react';
import Tabs from '@/components/common/Tab/Tab';
import MeetingList from '@/components/Home/MeetingList';
import styled from 'styled-components';

import BottomNavigation from '@/components/common/BottomNavi';
import FloatingPostButton from '@/components/common/FloatingPostButton';
import Header from '@/components/common/Header/Header';
import { flexAlignCenter } from '@/styles/CommonStyle';

const Container = styled.div`
  margin: 0 auto;
  max-width: 390px;
  position: relative;
  padding-top: 25px;
`;

const Line = styled.div`
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  border-top: 2px solid #ddd;
  height: 10px;
  margin-top: 10px;
  position: relative;
  z-index: 1;
`;

const Badge = styled.div`
  position: absolute;
  top: 88px;
  right: 22px;
  background-color: ${({ theme }) => theme.COLORS.main};
  color: ${({ theme }) => theme.COLORS.white};
  font-size: 10px;
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.light};
  padding: 3px 8px;
  border-radius: 20px;
  ${flexAlignCenter}
  white-space: nowrap;
  z-index: 10;
`;

const Home = () => {
  const [selectedTabId, setSelectedTabId] = useState('tab1');

  const tabs = [
    { id: 'tab1', label: '밥약' },
    { id: 'tab2', label: '술약' },
    { id: 'tab3', label: '배달팟' },
  ];

  const handleTabClick = (id: string) => {
    setSelectedTabId(id);
  };
  return (
    <Container>
      <Header subText="배달팟 실시간 모집 중" />
      <Line />
      <Badge>배달비가 부담될 때</Badge>

      <Tabs
        tabs={tabs}
        selectedTabId={selectedTabId}
        onTabClick={handleTabClick}
      />

      {selectedTabId === 'tab1' && <MeetingList cover="meal" />}
      {selectedTabId === 'tab2' && <MeetingList cover="beer" />}
      {selectedTabId === 'tab3' && (
        <div>
          <MeetingList cover="delivery" />
        </div>
      )}
      <FloatingPostButton />
      <BottomNavigation />
    </Container>
  );
};

export default Home;
