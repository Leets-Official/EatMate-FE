import styled from 'styled-components';
import addIcon from '@/assets/images/ic_plus.svg';
import theme from '@/styles/theme';

const ButtonContainer = styled.button`
  position: fixed;
  bottom: 90px;
  right: 16px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${theme.COLORS.main};
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 100;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #e87c35;
  }

  &:active {
    background-color: #d66f2b;
  }
`;

const Icon = styled.img`
  width: 16px;
  height: 16px;
`;

const FloatingPostButton = ({ onClick }: { onClick?: () => void }) => {
  return (
    <ButtonContainer onClick={onClick}>
      <Icon src={addIcon} alt="Add Post" />
    </ButtonContainer>
  );
};

export default FloatingPostButton;
