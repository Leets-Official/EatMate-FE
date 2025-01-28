import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import LocateIcon from '@/assets/images/ic_locate.svg?react';
import PersonIcon from '@/assets/images/ic_person.svg?react';
import MealCover from '@/assets/images/ic_meal_cover.svg';
import BeerCover from '@/assets/images/ic_beer_cover.svg';
import DeliveryCover from '@/assets/images/ic_delivery_cover.svg';
import Clock from '@/assets/images/ic_clock.svg';
import { flexAlignCenter, flexCenter, flexColumn } from '@/styles/CommonStyle';
import dayjs from 'dayjs';
interface MeetingListItemProps {
  cover: string;
  isSelected?: boolean;
  title: string;
  description: string;
  location: string;
  participants: number;
  maxParticipants: number;
  time: string;
  deliveryTime?: string;
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
  flex-shrink: 0;
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
  white-space: normal;
  overflow: hidden;
  text-overflow: ellipsis;
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
  flex-shrink: 1;
  margin-right: auto;
`;

const Participants = styled.div`
  ${flexAlignCenter}
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.light};
`;

const RemainingTimeBadge = styled.div`
  margin-top: 3px;
  width: 95px;
  ${flexAlignCenter}
  gap: 3px;
  color: ${({ theme }) => theme.COLORS.main};
  font-size: ${({ theme }) => theme.FONT_SIZE.sm};
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.light};
  border-radius: 5px;
  text-align: right;
  padding: 2px 6px;
  background-color: #fbded0;
  white-space: nowrap;

  img {
    width: 14px;
    height: 14px;
  }
`;

const MeetingListItem: React.FC<MeetingListItemProps> = ({
  cover,
  isSelected = false,
  title,
  description,
  location,
  participants,
  maxParticipants,
  time,
  deliveryTime,
}) => {
  const coverType =
    cover === 'meal' ? MealCover : cover === 'beer' ? BeerCover : DeliveryCover;

  const [remainingTime, setRemainingTime] = useState<string>('');

  useEffect(() => {
    const calculateRemainingTime = () => {
      const now = dayjs();
      const dueDate = dayjs(time);

      const diff = dueDate.diff(now, 'second');
      if (diff > 0) {
        const hours = Math.floor(diff / 3600);
        const minutes = Math.floor((diff % 3600) / 60);
        const seconds = diff % 60;

        if (hours > 0) {
          setRemainingTime(
            `${hours.toString().padStart(2, '0')}시간 ${minutes.toString().padStart(2, '0')}분`
          );
        } else {
          setRemainingTime(
            `${minutes.toString().padStart(2, '0')}분 ${seconds.toString().padStart(2, '0')}초`
          );
        }
      } else {
        setRemainingTime('시간이 만료되었습니다');
      }
    };

    calculateRemainingTime();
    const timer = setInterval(calculateRemainingTime, 1000);

    return () => clearInterval(timer);
  }, [time]);

  return (
    <Container isSelected={isSelected}>
      <MainContainer>
        <IconWrapper>
          <img src={coverType} alt="모임 아이콘" width="65" height="65" />
        </IconWrapper>
        <TextContainer>
          <Title>{title}</Title>
          <Description>{description}</Description>
          {cover === 'delivery' && deliveryTime && (
            <RemainingTimeBadge>
              <img src={Clock} alt="알람 아이콘" />
              {deliveryTime} 남았어요
            </RemainingTimeBadge>
          )}
        </TextContainer>
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
        <RemainingTimeBadge>
          {' '}
          <img src={Clock} alt="알람 아이콘" />
          {remainingTime}
        </RemainingTimeBadge>
      </InfoContainer>
    </Container>
  );
};

export default MeetingListItem;
