import Button from '@/components/common/Button/Button';
import { policyConstants } from '@/constants/policyContants';
import { useNavigate } from 'react-router-dom';
import { useRef, useState } from 'react';
import EmptyCircle from '@/assets/images/ic_empty_circle.svg';
// import FilledCircle from '@/assets/images/ic_filled_circle.svg';
import CheckIcon from '@/assets/images/ic_white_check.svg';
import { ButtonContainer } from '@/styles/SignUp/SignUp.styled';
import * as S from '@/styles/SignUp/PolicyAgreement.styled';

const PolicyAgreementStep: React.FC<{
  onAgree: () => void;
  onClose: () => void;
}> = ({ onAgree, onClose }) => {
  const nav = useNavigate();
  const modalRef = useRef<HTMLDivElement>(null);
  const [allChecked, setAllChecked] = useState(false);

  const handleToggleAll = () => {
    setAllChecked((prev) => !prev);
  };

  const onClickToDetail = (termId: number) => {
    nav(`/policy-details/${termId}`);
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  return (
    <>
      <S.Overlay onClick={handleOverlayClick} />
      <S.ModalContainer ref={modalRef} onClick={(e) => e.stopPropagation()}>
        <S.Title onClick={handleToggleAll}>
          <S.CheckImage
            src={allChecked ? EmptyCircle : EmptyCircle}
            alt="all-check"
          />
          모두 동의
        </S.Title>
        <S.Bar />

        <S.TermList>
          {policyConstants.map((content) => (
            <S.TermItem
              key={content.id}
              onClick={() => onClickToDetail(content.id)}
            >
              <span>{content.title}</span>
              {allChecked && <S.CheckImage src={CheckIcon} alt="checked" />}
            </S.TermItem>
          ))}
        </S.TermList>

        <ButtonContainer>
          <Button
            onClick={onAgree}
            variant="primary-outlineless"
            size="lg"
            rounded="sm"
            disabled={!allChecked}
          >
            회원가입 완료
          </Button>
        </ButtonContainer>
      </S.ModalContainer>
    </>
  );
};

export default PolicyAgreementStep;
