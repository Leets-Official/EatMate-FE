import { deliveryItems } from '@/constants/deliveryItems';
import { flexCenter, flexColumnCenter } from '@/styles/CommonStyle';
import { useState } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  ${flexCenter};
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
  width: 58px;
  height: 58px;
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

interface DeliveryCategoryProps {
  onCategorySelect: (category: string) => void;
}

const DeliveryCategory: React.FC<DeliveryCategoryProps> = ({
  onCategorySelect,
}) => {
  const [selectedItem, setSelectedItem] = useState<number | null>(null);

  const handleItemClick = (item: (typeof deliveryItems)[0]) => {
    if (selectedItem === item.id) {
      // 이미 선택된 아이템을 다시 클릭했을 때, 선택 취소
      setSelectedItem(null);
      onCategorySelect('');
    } else {
      // 새로운 아이템을 선택했을 때
      setSelectedItem(item.id);
      onCategorySelect(item.category);
    }
  };

  return (
    <Wrapper>
      <ItemsContainer>
        {deliveryItems.map((item) => (
          <ItemWrapper key={item.id}>
            <Item
              isSelected={selectedItem === item.id}
              onClick={() => handleItemClick(item)}
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
