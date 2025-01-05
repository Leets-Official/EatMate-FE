import React, { useRef } from 'react';
import * as S from '../Modal/styles';

interface ActionModalProps {
  isOpen: boolean;
  actions: {
    label: string;
    onClick: () => void;
    type?: 'primary' | 'delete';
  }[];
  onClose: () => void;
}

const ActionModal: React.FC<ActionModalProps> = ({
  isOpen,
  actions,
  onClose,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose(); // 모달 바깥 클릭 시 닫기
    }
  };

  if (!isOpen) return null;

  return (
    <S.Overlay onClick={handleBackdropClick}>
      <S.ModalContainer ref={modalRef}>
        {actions.map((action, index) => (
          <S.ModalButton
            key={index}
            type={action.type || 'primary'}
            onClick={action.onClick}
          >
            {action.label}
          </S.ModalButton>
        ))}
      </S.ModalContainer>
    </S.Overlay>
  );
};

export default ActionModal;
