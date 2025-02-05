import styled from 'styled-components';
import { flexColumn } from '@/styles/CommonStyle';
import sendIcon from '@/assets/images/ic_backImg_default1.svg';

export const ChatContainer = styled.div`
  ${flexColumn}
  height: 100vh;
  justify-content: space-between;
`;

export const MessagesList = styled.div`
  flex-grow: 1;
  overflow-y: auto;
  padding: 0 10px;
`;

export const Message = styled.div<{ isMine: boolean }>`
  ${flexColumn}
  align-items: ${({ isMine }) => (isMine ? 'flex-end' : 'flex-start')};
  margin: 10px;
`;

export const MessageBox = styled.div<{ isMine: boolean }>`
  max-width: 70%;
  padding: 10px;
  border-radius: ${({ isMine }) =>
    isMine ? '15px 0 15px 15px' : '0 15px 15px 15px'};
  background-color: ${({ isMine, theme }) =>
    isMine ? theme.COLORS.main : '#DDDDDD'};
  color: ${({ isMine, theme }) =>
    isMine ? theme.COLORS.white : theme.COLORS.black};
  font-size: ${({ theme }) => theme.FONT_SIZE.sm};
`;

export const MessageContent = styled.div<{ isMine: boolean }>`
  display: flex;
  flex-direction: row;
  justify-content: ${({ isMine }) => (isMine ? 'flex-end' : 'flex-start')};
  align-items: center;
  width: 100%;
`;

export const InputContainer = styled.div`
  display: flex;
  height: 40px;
  align-items: center;
  padding: 0 12px;
  border-radius: 20px;
  background-color: #eeeeee;
  margin: 0 10px 30px 10px;
`;

export const Input = styled.input`
  flex: 1;
  height: 100%;
  border: none;
  outline: none;
  background-color: transparent;
  color: balck;
  font-size: 14px;

  &::placeholder {
    color: #b6b6b6;
  }
`;

export const SendButton = styled.button`
  background: url(${sendIcon}) no-repeat center;
  border: none;
  width: 27px;
  height: 27px;
  border-radius: 50%;
  cursor: pointer;
`;

export const ProfileContainer = styled.div<{ isMine: boolean }>`
  display: ${({ isMine }) => (isMine ? 'none' : 'flex')};
  align-items: center;
  margin-bottom: 5px;
`;

export const ProfileText = styled.div`
  margin-left: 8px;
  font-size: ${({ theme }) => theme.FONT_SIZE.smMd};
`;

export const ProfileImg = styled.img`
  border: none;
  width: 31px;
  height: 31px;
  border-radius: 50%;
  cursor: pointer;
`;
export const TimeStamp = styled.span<{ isMine: boolean }>`
  font-size: ${({ theme }) => theme.FONT_SIZE.xs};
  color: #bfbfbf;
  padding: 5px;
  align-self: end;
`;

export const DateContainer = styled.div`
  background-color: #eeeeee;
  color: #bfbfbf;
  font-size: ${({ theme }) => theme.FONT_SIZE.sm};
  padding: 8px 16px;
  border-radius: 20px;
  width: fit-content;
  margin: 0px auto;
`;
