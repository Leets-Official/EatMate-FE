import Button from '@/components/common/Button/Button';
import styled, { keyframes } from 'styled-components';
import { policyContents } from '@/constants/policycontents';
import { useNavigate } from 'react-router-dom';

const SlideUp = keyframes`
    from {
        transform: translateY(100%);
    }
    to{
        transform: translateY(0);
    }
`;

export const Overlay = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.57);
  z-index: 1000;
`;
export const ModalContainer = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  z-index: 1100;
`;

export const StyledModal = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.COLORS.main};
  color: ${({ theme }) => theme.COLORS.white};
  font-size: ${({ theme }) => theme.FONT_SIZE.smMd};
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.semibold};
  padding: 20px;
  border-top-right-radius: 20px;
  border-top-left-radius: 20px;
  animation: ${SlideUp} 0.3s ease-out;
`;

export const TermItems = styled.div`
  cursor: pointer;
  font-size: ${({ theme }) => theme.FONT_SIZE.smMd};
  color: ${({ theme }) => theme.COLORS.white};
  display: flex;
  flex-direction: column;
`;
const PolicyAgreementStep: React.FC<{ onAgree: () => void }> = ({
  onAgree,
}) => {
  const nav = useNavigate();
  const onClickToDetail = (termId: number) => {
    nav(`/policy-details/${termId}`);
  };
  return (
    <>
      <Overlay />
      <ModalContainer>
        <StyledModal>
          <div>모두 동의</div>
          {policyContents.map((content) => (
            <TermItems
              key={content.id}
              onClick={() => onClickToDetail(content.id)}
            >
              {content.title}
            </TermItems>
          ))}
          <Button
            onClick={onAgree}
            variant="primary-outlineless"
            size="lg"
            rounded="sm"
          >
            시작하기
          </Button>
        </StyledModal>
      </ModalContainer>
    </>
  );
};

export default PolicyAgreementStep;
