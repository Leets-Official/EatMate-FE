import React from 'react';
import styled from 'styled-components';
import LocateIcon from '@/assets/images/ic_locate.svg?react';
import PersonIcon from '@/assets/images/ic_person.svg?react';
import MealCover from '@/assets/images/ic_meal_cover.svg';
import BeerCover from '@/assets/images/ic_beer_cover.svg';
import DeliveryCover from '@/assets/images/ic_delivery_cover.svg';
interface MeetingListItemProps {
  cover: string;
  isSelected: boolean;
  title: string;
  description: string;
  location: string;
  participants: string;
  time: string;
}

const Container = styled.div<{ isSelected: boolean }>`
  width: 334px;
  border-radius: 12px;
  padding: 13px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background-color: ${({ theme }) => theme.COLORS.white};
  border: 1px solid
    ${({ isSelected, theme }) => (isSelected ? theme.COLORS.main : '#E0E0E0')};
  box-shadow: ${({ isSelected }) =>
    isSelected
      ? '0 4px 10px rgba(0, 0, 0, 0.2)'
      : '0 2px 6px rgba(0, 0, 0, 0.1)'};
  cursor: pointer;
  gap: 12px;
`;

const MainContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
`;

const IconWrapper = styled.div`
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  margin-top: 5px;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 12px;
`;

const Title = styled.div`
  font-size: 14px;
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.light};
  color: ${({ theme }) => theme.COLORS.textPrimary};
  margin-bottom: 4px;
`;

const Description = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme.COLORS.gray[300]};
  line-height: 1.4;
  white-space: normal;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const InfoContainer = styled.div`
  display: flex;
  align-items: center;
  font-size: 12px;
  color: ${({ theme }) => theme.COLORS.gray[400]};
  gap: 8px;
  width: 100%;
`;

const Location = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  flex-shrink: 1;
  margin-right: auto;
`;

const Participants = styled.div`
  display: flex;
  align-items: center;
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.light};
`;

const TimeBadge = styled.div`
  color: ${({ theme }) => theme.COLORS.main};
  font-size: 12px;
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.light};
  border-radius: 12px;
  padding: 4px 10px;
  white-space: nowrap;
`;

const MeetingListItem: React.FC<MeetingListItemProps> = ({
  cover,
  isSelected,
  title,
  description,
  location,
  participants,
  time,
}) => {
  const coverType =
    cover === 'meal' ? MealCover : cover === 'beer' ? BeerCover : DeliveryCover;
  return (
    <Container isSelected={isSelected}>
      <MainContainer>
        <IconWrapper>
          <img src={coverType} alt="모임 아이콘" width="65" height="65" />
        </IconWrapper>
        <TextContainer>
          <Title>{title}</Title>
          <Description>{description}</Description>
        </TextContainer>
      </MainContainer>
      <InfoContainer>
        <Location>
          <LocateIcon />
          {location}
        </Location>
        <Participants>
          <PersonIcon />
          {participants}
        </Participants>
        <TimeBadge>{time}분 전 대화</TimeBadge>
      </InfoContainer>
    </Container>
  );
};

export default MeetingListItem;
