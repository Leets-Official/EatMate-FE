import styled from 'styled-components';
import addIcon from '@/assets/images/ic_plus.svg';
import theme from '@/styles/theme';

const Wrapper = styled.div`
  position: relative; /* 부모 컨테이너를 기준으로 버튼 위치 */
  width: 100%;
  max-width: 390px; /* 컨테이너의 최대 너비 설정 */
  margin: 0 auto; /* 화면 중앙 정렬 */
  height: 100%; /* 부모 컨테이너 높이 */
`;

const ButtonContainer = styled.button`
  position: absolute; /* 부모 컨테이너를 기준으로 위치 고정 */
  bottom: -60px;
  right: 23px;
  width: 41px;
  height: 41px;
  border-radius: 50%;
  background-color: ${theme.COLORS.main};
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 10; /* 다른 요소 위로 배치 */
  border: none;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #e87c35; /* 호버 시 색상 변경 */
  }

  &:active {
    background-color: #d66f2b; /* 클릭 시 색상 변경 */
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
