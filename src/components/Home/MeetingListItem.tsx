import theme from '@/styles/theme';
import React from 'react';
import styled, { css } from 'styled-components';

interface MeetingListItemProps {
  isSelected: boolean;
  title: string;
  description: string;
  location: string;
  participants: string;
  time: string;
}

const Container = styled.div<{ isSelected: boolean }>`
  width: 100%;
  max-width: 334px;
  height: auto;
  border-radius: 8px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #fff;
  border: 1px solid transparent;

  ${({ isSelected }) =>
    isSelected
      ? css`
          border: 1px solid ${theme.COLORS.main};
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
        `
      : css`
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
        `}
`;

const Title = styled.div`
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 8px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Description = styled.div`
  font-size: 14px;
  color: ${theme.COLORS.gray[300]};
  margin-bottom: 12px;
  white-space: normal;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const InfoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 12px;
  color: #777;
`;

const Location = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  flex-shrink: 1;
`;

const Participants = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const Time = styled.div`
  color: ${theme.COLORS.main};
`;

const MeetingListItem: React.FC<MeetingListItemProps> = ({
  isSelected,
  title,
  description,
  location,
  participants,
  time,
}) => {
  return (
    <Container isSelected={isSelected}>
      <div>
        <Title>{title}</Title>
        <Description>{description}</Description>
      </div>
      <InfoContainer>
        <Location>
          <img src="/src/assets/images/ic_locate.svg" alt="location icon" />
          {location}
        </Location>
        <Participants>
          <img src="/src/assets/images/ic_person.svg" alt="participants icon" />
          {participants}
        </Participants>
        <Time>{time}</Time>
      </InfoContainer>
    </Container>
  );
};

export default MeetingListItem;
