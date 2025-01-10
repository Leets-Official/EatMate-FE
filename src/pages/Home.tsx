import Tabs from '@/components/common/Tab';
import MeetingList from '@/components/Home/MeetingList';
import { useState } from 'react';
import styled from 'styled-components';
import logo from '@/assets/images/EatMate_main_Logo.svg';
import rightArrow from '@/assets/images/ic_arrow_right.svg';
import BottomNavigation from '@/components/common/BottomNavi';
import FloatingPostButton from '@/components/common/FloatingPostButton';
import DeliveryCategory from '@/components/Home/DeliveryCategory';

const Container = styled.div`
  margin: 0 auto;
  max-width: 390px;
  position: relative;
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
  cursor: pointer;
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
      <Logo src={logo} alt="로고" />

      <NoticeContainer>
        <div>배달팟 실시간 모집 중</div>
        <img src={rightArrow} alt="오른쪽 화살표" />
      </NoticeContainer>

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
