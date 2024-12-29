import mainLogo from '../../../assets/images/EatMate_main_Logo.svg';
import * as S from './styles';
import backArrow from '../../../assets/images/backButton.svg';
interface HeaderProps {
  title?: string;
  showBackButton?: boolean;
  subText?: string;
  onBackClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({
  title,
  showBackButton = false,
  subText,
  onBackClick,
}) => {
  return (
    <S.HeaderContainer showBackButton={showBackButton}>
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
        {subText && <S.SubText>{subText}</S.SubText>}
      </S.CenterContainer>
      <S.RightSpacer />
    </S.HeaderContainer>
  );
};

export default Header;
