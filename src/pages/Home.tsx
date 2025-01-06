import Tabs from '@/components/common/Tab';
import MeetingList from '@/components/Home/MeetingList';
import { useState } from 'react';
import styled from 'styled-components';
import logo from '@/assets/images/EatMate_main_Logo.svg';
import rightArrow from '@/assets/images/ic_arrow_right.svg';
import BottomNavigation from '@/components/common/BottomNavi';

const Container = styled.div`
  margin: 0 auto;
`;

const Logo = styled.img`
  display: block;
  margin: 20px auto;
  width: 72px;
  height: 29px;
`;

const NoticeContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 8px;
  margin: 16px 0;
  font-size: 12px;
  font-weight: 400;
`;

const TabsContainer = styled.div`
  margin-top: 12px;
`;

const MeetingListContainer = styled.div`
  margin-top: 10px;
`;

const DeliveryOptionsContainer = styled.div`
  margin-top: 20px;
  padding: 16px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  font-size: 14px;
  color: #555;
`;

const Home = () => {
  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabClick = (index: number) => {
    setSelectedTab(index);
    console.log(`선택된 탭: ${index}`);
  };

  return (
    <Container>
      <Logo src={logo} alt="로고" />

      <NoticeContainer>
        <div>배달팟 실시간 모집 중</div>
        <img src={rightArrow} alt="오른쪽 화살표" />
      </NoticeContainer>

      <TabsContainer>
        <Tabs
          tabs={['밥약', '술약', '배달팟']}
          onTabClick={handleTabClick}
          selectedIndex={selectedTab}
        />
      </TabsContainer>

      {selectedTab === 0 && <MeetingList />}
      {selectedTab === 1 && <MeetingList />}
      {selectedTab === 2 && (
        <div>
          <DeliveryOptionsContainer>배달팟 선택지</DeliveryOptionsContainer>
          <MeetingList />
        </div>
      )}
      <BottomNavigation />
    </Container>
  );
};

export default Home;
