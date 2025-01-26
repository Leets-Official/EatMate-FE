import DeliveryCategory from '@/components/Home/DeliveryCategory';
import { Label } from '@/components/common/Input/styles';
import styled from 'styled-components';

const CategoryContainer = styled.div`
  padding: 30px 0;
`;
const MenuCategoryOption: React.FC = () => {
  return (
    <CategoryContainer>
      <Label>메뉴 카테고리 설정</Label>
      <DeliveryCategory />
    </CategoryContainer>
  );
};

export default MenuCategoryOption;
