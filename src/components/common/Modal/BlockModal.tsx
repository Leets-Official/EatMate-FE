import React, { useState } from 'react';
import styled from 'styled-components';
import Button from '@/components/common/Button/Button';
import CheckIcon from '@/assets/images/ic_circle_check.svg';
import { flexCenter } from '@/styles/CommonStyle';
import { useNavigate } from 'react-router-dom';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  ${flexCenter}
`;

const ModalContainer = styled.div`
  background: ${({ theme }) => theme.COLORS.white};
  border-radius: 16px;
  padding: 24px 30px;
  max-width: 300px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  width: 263px;
  height: auto;
`;

const Description = styled.div`
  font-size: ${({ theme }) => theme.FONT_SIZE.smMd};
  margin: 15px 0;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 30px;
`;

interface BlockModalProps {
  onClose: () => void;
  isReport: boolean;
  memberId: string;
}

const BlockModal: React.FC<BlockModalProps> = ({
  onClose,
  isReport,
  memberId,
}) => {
  const [isSuccess, setIsSuccess] = useState(false);
  const navi = useNavigate();
  const handleBlock = () => {
    //TODO: 유저 차단 API 연결
    setIsSuccess(true);
    setTimeout(() => {
      onClose();
      navi('/home');
    }, 1500);
  };

  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget && !isSuccess) {
      onClose();
    }
  };

  return (
    <ModalOverlay onClick={handleOverlayClick}>
      <ModalContainer>
        {isSuccess ? (
          <>
            <img
              src={CheckIcon}
              alt="Success"
              style={{ marginBottom: '10px' }}
            />
            <Description>
              {isReport ? '신고 되었습니다.' : '차단 되었습니다.'}
            </Description>
          </>
        ) : (
          <>
            <Description>
              {isReport ? (
                '이 사용자를 신고하시겠습니까?'
              ) : (
                <>
                  상대방의 모든 메시지가 <br />
                  표시되지 않고 차단됩니다.
                  <br />이 사용자를 차단하시겠습니까?
                </>
              )}
            </Description>
            <ButtonContainer>
              <Button size="sm" rounded="lg" onClick={handleBlock}>
                확인
              </Button>
            </ButtonContainer>
          </>
        )}
      </ModalContainer>
    </ModalOverlay>
  );
};

export default BlockModal;
