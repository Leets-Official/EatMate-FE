import Tabs from '@/components/common/Tab/Tab';
import MeetingList from '@/components/Home/MeetingList';
import { useState } from 'react';
import styled from 'styled-components';

import BottomNavigation from '@/components/common/BottomNavi';
import FloatingPostButton from '@/components/common/FloatingPostButton';
import DeliveryCategory from '@/components/Home/DeliveryCategory';
import Header from '@/components/common/Header/Header';

const Container = styled.div`
  margin: 0 auto;
  max-width: 390px;
  position: relative;
  padding-top: 25px;
`;
const Line = styled.div`
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  border-top: 2px solid #ddd;
  height: 20px;
  margin-top: 10px;
`;

const Home = () => {
  // 선택된 탭의 ID를 관리하는 상태
  const [selectedTabId, setSelectedTabId] = useState('tab1');

  // 탭 데이터
  const tabs = [
    { id: 'tab1', label: '밥약' },
    { id: 'tab2', label: '술약' },
    { id: 'tab3', label: '배달팟' },
  ];

  // 탭 클릭 핸들러
  const handleTabClick = (id: string) => {
    setSelectedTabId(id);
  };
  const handlePostClick = () => {
    console.log('Post button clicked');
  };

  return (
    <Container>
      <Header subText="배달팟 실시간 모집 중" />
      <Line />
      <Tabs
        tabs={tabs}
        selectedTabId={selectedTabId}
        onTabClick={handleTabClick}
      />

      {selectedTabId === 'tab1' && <MeetingList cover="meal" />}
      {selectedTabId === 'tab2' && <MeetingList cover="beer" />}
      {selectedTabId === 'tab3' && (
        <div>
          <DeliveryCategory />
          <MeetingList cover="delivery" />
        </div>
      )}
      <FloatingPostButton onClick={handlePostClick} />
      <BottomNavigation />
    </Container>
  );
};

export default Home;
