import * as S from './styles';
import mainLogo from '@/assets/images/EatMate_main_Logo.svg';
import backArrow from '@/assets/images/backButton.svg';
import rightArrow from '@/assets/images/ic_arrow_right.svg';
import menu from '@/assets/images/ic_menu.svg';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  title?: string;
  showLogo?: boolean;
  showBackButton?: boolean;
  subText?: string;
  onBackClick?: () => void;
  isJoin?: boolean;
  isMenu?: boolean;
  onLeaveClick?: () => void;
  onMenuClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({
  title,
  showBackButton = false,
  subText,
  onBackClick,
  isJoin = false,
  onLeaveClick,
  showLogo = true,
  isMenu = false,
  onMenuClick,
}) => {
  const navigate = useNavigate();
  // 기본 뒤로 가기 함수
  const handleBackClick = () => {
    navigate(-1);
  };
  const handleNotice = () => {
    navigate('/mypage/notice');
  };

  return (
    <S.HeaderContainer>
      {showBackButton && (
        <S.BackButton onClick={onBackClick || handleBackClick}>
          <img src={backArrow} alt="뒤로가기" />
        </S.BackButton>
      )}
      <S.CenterContainer>
        {showLogo && !title ? (
          <img src={mainLogo} alt="eatmate-logo" width="72px" height="29px" />
        ) : title ? (
          <S.Title>{title}</S.Title>
        ) : null}
        {subText && (
          <S.SubText onClick={handleNotice}>
            {subText} <img src={rightArrow} alt="오른쪽 화살표" />
          </S.SubText>
        )}
      </S.CenterContainer>
      {isJoin && <S.LeaveButton onClick={onLeaveClick}>나가기</S.LeaveButton>}
      {isMenu && <img src={menu} onClick={onMenuClick} alt="메뉴" />}
    </S.HeaderContainer>
  );
};

export default Header;
