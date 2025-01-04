import styled from 'styled-components';

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: flex-end;
`;

export const Container = styled.div`
  width: 100%;
  max-width: 400px;
  background-color: #ffffff;
  border-radius: 12px 12px 0 0;
  padding: 16px;
  box-shadow: 0 -4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`;

export const ActionButton = styled.button<{ color: 'default' | 'red' }>`
  width: 100%;
  padding: 16px;
  font-size: 16px;
  color: ${({ color }) => (color === 'red' ? 'red' : '#007bff')};
  background: none;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #f9f9f9;
  }
`;

export const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: #e0e0e0;
`;

export const CloseButton = styled.button`
  width: 100%;
  padding: 16px;
  font-size: 16px;
  font-weight: bold;
  color: white;
  background-color: #ff6b00;
  border: none;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background-color: #ff5500;
  }
`;
