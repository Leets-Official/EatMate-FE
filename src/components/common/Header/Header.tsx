import * as S from './styles';
import mainLogo from '@/assets/images/EatMate_main_Logo.svg';
import backArrow from '@/assets/images/backButton.svg';
import rightArrow from '@/assets/images/ic_arrow_right.svg';
import menu from '@/assets/images/ic_menu.svg';
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
  return (
    <S.HeaderContainer>
      {showBackButton && (
        <S.BackButton onClick={onBackClick}>
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
          <S.SubText>
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
