import styled from 'styled-components';
import addIcon from '@/assets/images/ic_plus.svg';
import theme from '@/styles/theme';

const Wrapper = styled.div`
  position: fixed;
  display: flex;
  justify-content: end;
  bottom: 90px;
  width: 100%;
  max-width: 390px;
  margin: 0 auto;
`;

const ButtonContainer = styled.button`
  width: 41px;
  height: 41px;
  margin-right: 20px;
  border-radius: 50%;
  background-color: ${theme.COLORS.main};
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 999;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    opacity: 0.9;
  }

  &:active {
    background-color: #d66f2b;
  }
`;

const Icon = styled.img`
  width: 17px;
  height: 17px;
`;

const FloatingPostButton = ({ onClick }: { onClick?: () => void }) => {
  return (
    <Wrapper>
      <ButtonContainer onClick={onClick}>
        <Icon src={addIcon} alt="Add Post" />
      </ButtonContainer>
    </Wrapper>
  );
};

export default FloatingPostButton;
