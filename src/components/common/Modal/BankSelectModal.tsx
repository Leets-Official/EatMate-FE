import { bankList } from '@/constants/bankConstants';
import styled from 'styled-components';

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: flex-end;
  justify-content: center;
  z-index: 9999;
`;
const Bar = styled.div`
  width: 50px;
  height: 4px;
  background: #9a9a9a;
  border-radius: 2px;
  margin: 0 auto 50px;
`;

const Header = styled.div`
  font-size: ${({ theme }) => theme.FONT_SIZE.lg};
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.regular};
  text-align: left;
  margin-bottom: 20px;
`;

const BankGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
`;

const ModalContainer = styled.div`
  background: #f0f0f0;
  width: 100%;
  max-width: 450px;
  border-radius: 20px 20px 0 0;
  padding: 20px;
  box-shadow: 0px -4px 10px rgba(0, 0, 0, 0.1);
`;

const BankItem = styled.div`
  padding: 20px;
  background: ${({ theme }) => theme.COLORS.white};
  border-radius: 10px;
  text-align: center;
  cursor: pointer;
  &:hover {
    background: #e0e0e0;
  }

  img {
    width: 70px;
    height: 30px;
  }
`;

interface BankSelectModalProps {
  onSelect: (bank: string) => void;
  onClose: () => void;
}

const BankSelectModal: React.FC<BankSelectModalProps> = ({
  onSelect,
  onClose,
}) => {
  return (
    <Overlay onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <Bar />
        <Header>은행을 선택해주세요</Header>
        <BankGrid>
          {bankList.map((bank) => (
            <BankItem key={bank.id} onClick={() => onSelect(bank.name)}>
              <img src={bank.src} alt={bank.name} />
            </BankItem>
          ))}
        </BankGrid>
      </ModalContainer>
    </Overlay>
  );
};

export default BankSelectModal;
