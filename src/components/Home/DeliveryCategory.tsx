import { flexCenter, flexColumnCenter } from '@/styles/CommonStyle';
import { useState } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  ${flexCenter};
  margin-top: 10px;
`;

const ItemsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 8px;
  overflow: hidden;
  padding-bottom: 5px;
  transition: max-height 0.3s ease-in-out;
`;

const ItemWrapper = styled.div`
  ${flexColumnCenter}
  align-items: center;
`;

const Item = styled.div<{ isSelected: boolean }>`
  ${flexCenter};
  width: 60px;
  height: 60px;
  border-radius: 50%;
  cursor: pointer;
  background-color: ${({ isSelected }) => (isSelected ? '#FBDED0' : 'white')};
  border: 1px solid
    ${({ isSelected, theme }) => (isSelected ? theme.COLORS.main : '#E0E0E0')};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition:
    background-color 0.3s ease,
    border-color 0.3s ease,
    box-shadow 0.3s ease;

  &:hover {
    border: 1px solid ${({ theme }) => theme.COLORS.main};
  }
`;

const Icon = styled.img`
  width: 30px;
  height: 30px;
`;

const Label = styled.span<{ isSelected: boolean }>`
  margin-top: 4px;
  font-size: ${({ theme }) => theme.FONT_SIZE.sm};
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.light};
  color: ${({ isSelected, theme }) =>
    isSelected ? theme.COLORS.main : '#636363'};
`;

const items = [
  { id: 1, name: '버거', icon: '/src/assets/images/delivery/ic_hamburger.svg' },
  { id: 2, name: '치킨', icon: '/src/assets/images/delivery/ic_chicken.svg' },
  { id: 3, name: '피자', icon: '/src/assets/images/delivery/ic_pizza.svg' },
  { id: 4, name: '일식', icon: '/src/assets/images/delivery/ic_japan.svg' },
  { id: 5, name: '한식', icon: '/src/assets/images/delivery/ic_korea.svg' },
  { id: 6, name: '중식', icon: '/src/assets/images/delivery/ic_china.svg' },
  { id: 7, name: '아시안', icon: '/src/assets/images/delivery/ic_asian.svg' },
  { id: 8, name: '족발/보쌈', icon: '/src/assets/images/delivery/ic_pig.svg' },
  {
    id: 9,
    name: '커피/차',
    icon: '/src/assets/images/delivery/ic_coffee.svg',
  },
  {
    id: 10,
    name: '디저트',
    icon: '/src/assets/images/delivery/ic_dessert.svg',
  },
];

const DeliveryCategory = () => {
  const [selectedItem, setSelectedItem] = useState<number | null>(null);

  const handleItemClick = (id: number) => {
    setSelectedItem(id);
  };

  return (
    <Wrapper>
      <ItemsContainer>
        {items.map((item) => (
          <ItemWrapper key={item.id}>
            <Item
              isSelected={selectedItem === item.id}
              onClick={() => handleItemClick(item.id)}
            >
              <Icon src={item.icon} alt={item.name} />
            </Item>
            <Label isSelected={selectedItem === item.id}>{item.name}</Label>
          </ItemWrapper>
        ))}
      </ItemsContainer>
    </Wrapper>
  );
};

export default DeliveryCategory;
