import { useState } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10px;
`;

const ItemsContainer = styled.div<{ expanded: boolean }>`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 8px;
  max-height: ${({ expanded }) => (expanded ? 'none' : '64px')};
  overflow: hidden;
  transition: max-height 0.3s ease-in-out;
`;

const Item = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const Icon = styled.img`
  width: 30px;
  height: 30px;
`;

const MoreButton = styled.button`
  margin-top: 8px;
  background: none;
  border: none;
  color: ${({ theme }) => theme.COLORS.main};
  font-size: 14px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 4px;

  &:hover {
    text-decoration: underline;
  }
`;

const items = [
  { id: 1, name: '버거', icon: '/src/assets/images/delivery/ic_hamburger.svg' },
  { id: 2, name: '치킨', icon: '/src/assets/images/delivery/ic_chicken.svg' },
  { id: 3, name: '피자', icon: '/src/assets/images/delivery/ic_pizza.svg' },
  { id: 4, name: '일식', icon: '/src/assets/images/delivery/ic_japen.svg' },
  { id: 5, name: '한식', icon: '/src/assets/images/delivery/ic_korea.svg' },
  { id: 6, name: '중식', icon: '/src/assets/images/delivery/ic_china.svg' },
  { id: 7, name: '족발/보쌈', icon: '/src/assets/images/delivery/ic_pig.svg' },
  { id: 8, name: '디저트', icon: '/src/assets/images/delivery/ic_dessert.svg' },
  { id: 9, name: '아시안', icon: '/src/assets/images/delivery/ic_asian.svg' },
];

const DeliveryCategory = () => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => {
    setExpanded((prev) => !prev);
  };

  return (
    <Wrapper>
      <ItemsContainer expanded={expanded}>
        {items.map((item) => (
          <Item key={item.id}>
            <Icon src={item.icon} alt={item.name} />
            <span>{item.name}</span>
          </Item>
        ))}
      </ItemsContainer>
      <MoreButton onClick={toggleExpanded}>
        {expanded ? '접기' : '더보기'}
        <span>{expanded ? '▲' : '▼'}</span>
      </MoreButton>
    </Wrapper>
  );
};

export default DeliveryCategory;
