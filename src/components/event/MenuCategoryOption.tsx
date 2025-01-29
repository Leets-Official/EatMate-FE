import DeliveryCategory from '@/components/Home/DeliveryCategory';
import { Label } from '@/components/common/Input/styles';
import styled from 'styled-components';

const CategoryContainer = styled.div`
  padding: 30px 0;
`;

const StyledLabel = styled(Label)`
  margin-bottom: 10px;
`;

interface DeliveryCategoryProps {
  onCategorySelect: (category: string) => void;
}

const MenuCategoryOption: React.FC<DeliveryCategoryProps> = ({
  onCategorySelect,
}) => {
  return (
    <CategoryContainer>
      <StyledLabel>메뉴 카테고리 설정</StyledLabel>
      <DeliveryCategory onCategorySelect={onCategorySelect} />
    </CategoryContainer>
  );
};

export default MenuCategoryOption;
