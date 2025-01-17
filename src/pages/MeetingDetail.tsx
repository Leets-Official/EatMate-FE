import Tabs from '@/components/common/Tab/Tab';
import { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  margin: 0 auto;
  max-width: 390px;
  position: relative;
  padding-top: 25px;
`;
const MeetingDetail = () => {
  const [selectedTabId, setSelectedTabId] = useState('tab1');

  const tabs = [
    { id: 'tab1', label: '홈' },
    { id: 'tab2', label: '채팅팅' },
  ];

  const handleTabClick = (id: string) => {
    setSelectedTabId(id);
  };
  return (
    <Container>
      <Tabs
        tabs={tabs}
        selectedTabId={selectedTabId}
        onTabClick={handleTabClick}
      />
    </Container>
  );
};

export default MeetingDetail;
