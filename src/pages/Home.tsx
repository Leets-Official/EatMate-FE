import Tabs from '@/components/common/Tab';
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
`;

const Home = () => {
  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabClick = (index: number) => {
    setSelectedTab(index);
    console.log(`선택된 탭: ${index}`);
  };
  const handlePostClick = () => {
    console.log('Post button clicked');
  };

  return (
    <Container>
      <Header subText="배달팟 실시간 모집 중" />
      <Line />
      <Tabs
        tabs={['밥약', '술약', '배달팟']}
        onTabClick={handleTabClick}
        selectedIndex={selectedTab}
      />

      {selectedTab === 0 && <MeetingList />}
      {selectedTab === 1 && <MeetingList />}
      {selectedTab === 2 && (
        <div>
          <DeliveryCategory />
          <MeetingList />
        </div>
      )}
      <FloatingPostButton onClick={handlePostClick} />
      <BottomNavigation />
    </Container>
  );
};

export default Home;
