import styled from 'styled-components';

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: flex-end;
`;

export const ModalContainer = styled.div`
  width: 100%;
  max-width: 350px;
  background: ${({ theme }) => theme.COLORS.gray[200]};
  border-radius: 16px;
  margin: 20px 20px 30px 20px;
  box-shadow: 0px -2px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

export const ModalButton = styled.button<{ type: 'primary' | 'delete' }>`
  width: 100%;
  padding: 16px;
  font-size: ${({ theme }) => theme.FONT_SIZE.md};
  background: ${({ theme }) => theme.COLORS.gray[200]};
  color: ${({ type }) => (type === 'delete' ? '#FF4F4F' : '#615BFF')};
  border: none;
  text-align: center;
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.COLORS.gray[300]};
  }

  &:not(:last-child) {
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  }
`;
