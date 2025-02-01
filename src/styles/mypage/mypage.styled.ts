import styled from 'styled-components';
import {
  flexAlignCenter,
  flexCenter,
  flexColumn,
  flexColumnCenter,
} from '@/styles/CommonStyle';
import theme from '@/styles/theme';

export const ButtonContainer = styled.div`
  padding: 20px;
  ${flexCenter}
  margin-bottom: 50px;
`;

export const TitleContainer = styled.div`
  padding: 20px 0 0 20px;
`;

export const ProfileContainer = styled.div`
  ${flexAlignCenter}
  gap: 20px;
  padding: 20px;
`;

export const MeetingItems = styled.div`
  ${flexColumnCenter}
  gap: 5px;
`;

export const ProfileWrapper = styled.div`
  position: relative;
  width: 100px;
  height: 100px;
  cursor: pointer;
`;

export const ProfileImage = styled.img`
  width: 100%;
  height: 100%;

  border-radius: 50%;
`;

export const EditIcon = styled.img`
  position: absolute;
  bottom: 5px;
  right: 0;
  width: 30px;
  height: 30px;
`;

export const MeetingContainer = styled.div`
  ${flexCenter}
  flex-direction: row;
  gap: 70px;
  padding: 15px;
  margin-bottom: 10px;
  background-color: #fcebcb;
  width: 100%;
`;

export const TextContainer = styled.div`
  ${flexColumn}
  gap:5px;
`;

export const Text = styled.div<{
  fontSize: keyof typeof theme.FONT_SIZE;
  fontWeight?: keyof typeof theme.FONT_WEIGHT;
  color?: 'gray' | 'main';
}>`
  font-weight: ${({ theme, fontWeight = 'light' }) =>
    theme.FONT_WEIGHT[fontWeight]};
  font-size: ${({ theme, fontSize }) => theme.FONT_SIZE[fontSize]};
  color: ${({ theme, color }) =>
    color === 'gray'
      ? '#858585'
      : color === 'main'
        ? theme.COLORS.main
        : theme.COLORS.black};
`;

export const MenuContainer = styled.div`
  ${flexColumn}
  padding:40px;
  justify-content: center;
  gap: 30px;
`;

export const MenuItem = styled.div`
  ${flexAlignCenter}
  gap: 20px;
  cursor: pointer;

  img {
    width: 24px;
    height: 24px;
  }
`;

export const SectionContainer = styled.div`
  ${flexColumn}
  gap: 15px;
`;

export const Divider = styled.div`
  height: 1px;
  background-color: ${({ theme }) => theme.COLORS.gray[10]};
  margin: 10px 0 -5px 0;
`;
