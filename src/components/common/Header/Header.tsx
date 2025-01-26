import * as S from './styles';
import mainLogo from '@/assets/images/EatMate_main_Logo.svg';
import backArrow from '@/assets/images/backButton.svg';
import rightArrow from '@/assets/images/ic_arrow_right.svg';

interface HeaderProps {
  title?: string;
  showBackButton?: boolean;
  subText?: string;
  onBackClick?: () => void;
  isJoin?: boolean;
  onLeaveClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({
  title,
  showBackButton = false,
  subText,
  onBackClick,
  isJoin = false,
  onLeaveClick,
}) => {
  return (
    <S.HeaderContainer>
      {showBackButton && (
        <S.BackButton onClick={onBackClick}>
          <img src={backArrow} alt="뒤로가기" />
        </S.BackButton>
      )}
      <S.CenterContainer>
        {title ? (
          <S.Title>{title}</S.Title>
        ) : (
          <img src={mainLogo} alt="eatmate-logo" width="72px" height="29px" />
        )}
        {subText && (
          <S.SubText>
            {subText} <img src={rightArrow} alt="오른쪽 화살표" />
          </S.SubText>
        )}
      </S.CenterContainer>
      {isJoin && <S.LeaveButton onClick={onLeaveClick}>나가기</S.LeaveButton>}
    </S.HeaderContainer>
  );
};

export default Header;
