import React from 'react';
import styled from 'styled-components';
import LocateIcon from '@/assets/images/ic_locate.svg?react';
import PersonIcon from '@/assets/images/ic_person.svg?react';
import MealCover from '@/assets/images/ic_meal_cover.svg';
import BeerCover from '@/assets/images/ic_beer_cover.svg';
import DeliveryCover from '@/assets/images/ic_delivery_cover.svg';
import Clock from '@/assets/images/ic_clock.svg';
import { flexAlignCenter, flexCenter, flexColumn } from '@/styles/CommonStyle';
import useRemainingTime from '@/hooks/useRemainingTime';
import { calculateTimeAgo } from '@/utils/dateUtils';
interface MeetingListItemProps {
  cover: string;
  isSelected?: boolean;
  title: string;
  description: string;
  location: string;
  participants: number;
  maxParticipants: number;
  time: string | JSX.Element;
  rightSection?: string;
  onClick?: () => void;
  isMyMeeting?: boolean;
  lastChatAt: string;
}

const Container = styled.div<{ isSelected: boolean }>`
  width: 334px;
  border-radius: 12px;
  padding: 13px;
  ${flexColumn}
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
  ${flexCenter}
  margin-top: 5px;
`;

const TextContainer = styled.div`
  ${flexColumn}
  margin-left: 12px;
`;

const Title = styled.div`
  font-size: ${({ theme }) => theme.FONT_SIZE.smMd};
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.light};
  color: ${({ theme }) => theme.COLORS.textPrimary};
  margin-bottom: 4px;
`;

const Description = styled.div`
  font-size: ${({ theme }) => theme.FONT_SIZE.sm};
  color: ${({ theme }) => theme.COLORS.gray[300]};
  line-height: 1.4;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  word-wrap: break-word;
`;

const InfoContainer = styled.div`
  ${flexAlignCenter}
  font-size: ${({ theme }) => theme.FONT_SIZE.sm};
  color: ${({ theme }) => theme.COLORS.gray[400]};
  gap: 8px;
  width: 100%;
  justify-content: space-between;
`;

const Location = styled.div`
  ${flexAlignCenter}
  gap: 4px;
  margin-right: auto;
`;

const Participants = styled.div`
  ${flexAlignCenter}
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.light};
`;

const Badge = styled.div<{ marginLeft?: string }>`
  margin-top: 3px;
  padding: 2px 8px;
  ${flexAlignCenter}
  gap: 3px;
  color: ${({ theme }) => theme.COLORS.main};
  font-size: ${({ theme }) => theme.FONT_SIZE.sm};
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.light};
  border-radius: 5px;
  text-align: right;
  background-color: #fbded0;
  display: inline-flex;
  margin-left: ${({ marginLeft }) => marginLeft || '0'};
`;

const MeetingBadge = styled.div`
  margin-top: 3px;
  padding: 2px 8px;
  ${flexAlignCenter}
  gap: 3px;
  color: #f3aa24;
  font-size: ${({ theme }) => theme.FONT_SIZE.sm};
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.light};
  border-radius: 5px;
  text-align: right;
  background-color: #fdeed3;
  white-space: nowrap;
  display: inline-flex;
`;

const MeetingListItem: React.FC<MeetingListItemProps> = ({
  cover,
  title,
  description,
  location,
  participants,
  maxParticipants,
  time,
  rightSection,
  onClick,
  isMyMeeting = false,
  lastChatAt,
}) => {
  const coverType =
    cover === 'meal' ? MealCover : cover === 'beer' ? BeerCover : DeliveryCover;
  const remainingTime =
    typeof time === 'string' ? useRemainingTime(time) : null;

  const formattedDescription =
    description.length > 30 ? `${description.slice(0, 30)}...` : description;

  return (
    <Container isSelected={isMyMeeting} onClick={onClick}>
      <MainContainer>
        <IconWrapper>
          <img src={coverType} alt="모임 아이콘" width="65" height="65" />
        </IconWrapper>

        <div>
          <TextContainer>
            <Title>{title}</Title>
            <Description>{formattedDescription}</Description>
          </TextContainer>
          {isMyMeeting ? (
            <MeetingBadge>{time}</MeetingBadge>
          ) : (
            cover === 'delivery' && (
              <Badge>
                {' '}
                <img src={Clock} alt="알람 아이콘" />
                {remainingTime}
              </Badge>
            )
          )}
        </div>
      </MainContainer>
      <InfoContainer>
        <Location>
          <LocateIcon />
          {location}
        </Location>
        <Participants>
          <PersonIcon />
          {participants}/{maxParticipants}
        </Participants>
        {lastChatAt === null ? (
          <div></div>
        ) : (
          <Badge>
            {rightSection
              ? rightSection
              : `${calculateTimeAgo(lastChatAt)} 대화`}
          </Badge>
        )}
      </InfoContainer>
    </Container>
  );
};

export default MeetingListItem;
