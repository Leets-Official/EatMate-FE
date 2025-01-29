import DeliveryCategory from '@/components/Home/DeliveryCategory';
import { Label } from '@/components/common/Input/styles';
import styled from 'styled-components';

const CategoryContainer = styled.div`
  padding: 30px 0;
`;

const StyledLabel = styled(Label)`
  margin-bottom: 10px;
`;

const MenuCategoryOption: React.FC = () => {
  return (
    <CategoryContainer>
      <StyledLabel>메뉴 카테고리 설정</StyledLabel>
      <DeliveryCategory />
    </CategoryContainer>
  );
};

export default MenuCategoryOption;
