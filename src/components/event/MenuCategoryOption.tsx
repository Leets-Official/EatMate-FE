import DeliveryCategory from '@/components/Home/DeliveryCategory';
import { Label } from '@/components/common/Input/styles';
import styled from 'styled-components';
import InputErrorMessage from '@/components/common/Input/InputErrorMessage';

const CategoryContainer = styled.div`
  padding: 30px 0;
`;

const StyledLabel = styled(Label)`
  margin-bottom: 10px;
`;

interface DeliveryCategoryProps {
  onCategorySelect: (category: string) => void;
  showError?: boolean;
}

const MenuCategoryOption: React.FC<DeliveryCategoryProps> = ({
  onCategorySelect,
  showError = false,
}) => {
  return (
    <CategoryContainer>
      <StyledLabel hasError={showError}>메뉴 카테고리 설정</StyledLabel>
      <DeliveryCategory onCategorySelect={onCategorySelect} />
      {showError && (
        <InputErrorMessage message="메뉴 카테고리를 설정해주세요." />
      )}
    </CategoryContainer>
  );
};

export default MenuCategoryOption;
