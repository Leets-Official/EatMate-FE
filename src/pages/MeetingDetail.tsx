import Button from '@/components/common/Button/Button';
import Header from '@/components/common/Header/Header';
import Tabs from '@/components/common/Tab/Tab';
import { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  margin: 0 auto;
  max-width: 390px;
  position: relative;
  padding-top: 25px;
  justify-content: center;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 21px;
  margin: 10px auto;
  justify-content: center; /* 버튼들을 수평으로 가운데 정렬 */
  align-items: center; /* 버튼들이 수직으로도 정렬되도록 설정 (선택 사항) */
`;

const MeetingDetail = () => {
  const [selectedTabId, setSelectedTabId] = useState('tab1');

  const tabs = [
    { id: 'tab1', label: '홈' },
    { id: 'tab2', label: '채팅' },
  ];

  const handleTabClick = (id: string) => {
    setSelectedTabId(id);
  };
  return (
    <Container>
      <Header title="어쩌구" />
      <Tabs
        tabs={tabs}
        selectedTabId={selectedTabId}
        onTabClick={handleTabClick}
      />
      <ButtonContainer>
        <Button variant="primary-outline" size="sm" rounded="sm">
          초대하기
        </Button>
        <Button size="sm" rounded="sm">
          수정하기
        </Button>
      </ButtonContainer>
    </Container>
  );
};

export default MeetingDetail;
