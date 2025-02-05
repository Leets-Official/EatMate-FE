import React from 'react';
import styled from 'styled-components';
import PeopleIcon from '@/assets/images/ic_people_line.svg';
import LocationIcon from '@/assets/images/ic_locate.svg';
import CalendarIcon from '@/assets/images/ic_calendar.svg';
import ClockIcon from '@/assets/images/ic_clock_line.svg';
import ChatIcon from '@/assets/images/ic_chat.svg';
import { formatTimeWithMeridiem } from '@/utils/dateUtils';
import { flexColumn } from '@/styles/CommonStyle';
import { useNavigate } from 'react-router-dom';
import useRemainingTime from '@/hooks/useRemainingTime';

interface MeetingInfoProps {
  gender: string;
  location: string;
  time: string;
  chatTime: string;
  meetingType: string;
}

const InfoContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: flex-start;
  margin-top: 36px;
`;

const InfoItem = styled.div`
  ${flexColumn}
  align-items: center;
  font-size: 14px;
  min-width: 80px;
  text-align: center;
`;

const InfoTitle = styled.div`
  font-size: ${({ theme }) => theme.FONT_SIZE.sm};
  color: ${({ theme }) => theme.COLORS.gray[600]};
  text-align: center;
`;

const ChatText = styled.div`
  color: ${({ theme }) => theme.COLORS.main};
  font-size: 10px;
`;

const DeliveryText = styled.div`
  color: ${({ theme }) => theme.COLORS.main};
  font-size: ${({ theme }) => theme.FONT_SIZE.sm};
`;

const Icon = styled.img`
  width: 24px;
  height: 24px;
  margin-bottom: 9px;
`;

const MeetingInfo: React.FC<MeetingInfoProps> = ({
  gender,
  location,
  time,
  chatTime,
  meetingType,
}) => {
  const navi = useNavigate();

  const handleChat = () => {
    navi('/chatting');
  };

  // 조건에 따라 meetingInfoContents 배열을 동적으로 변경
  const getMeetingInfoContents = () => [
    {
      icon: PeopleIcon,
      alt: '참가자 아이콘',
      title: (
        <div>
          {gender === 'ALL'
            ? '모두 가능'
            : gender === 'MALE'
              ? '남자만'
              : gender === 'FEMALE'
                ? '여자만'
                : '지정되지 않음'}
        </div>
      ),
    },
    {
      icon: LocationIcon,
      alt: '위치 아이콘',
      title: <div>{location}</div>,
    },
    {
      icon: meetingType === 'DELIVERY' ? ClockIcon : CalendarIcon,
      alt: meetingType === 'DELIVERY' ? '시계 아이콘' : '캘린더 아이콘',
      title:
        meetingType === 'DELIVERY' ? (
          <div>후 주문 마감</div>
        ) : (
          <div>{formatTimeWithMeridiem(time)}</div>
        ),
      DeliveryText:
        meetingType === 'DELIVERY'
          ? () => `${useRemainingTime(time)}`
          : undefined,
    },
    {
      icon: ChatIcon,
      alt: '채팅 아이콘',
      title: <div>채팅</div>,
      ChatText: () => `${chatTime} 전 대화`,
    },
  ];

  const meetingInfoContents = getMeetingInfoContents();

  return (
    <InfoContainer>
      {meetingInfoContents.map((item, index) => (
        <InfoItem
          key={index}
          onClick={() => {
            if (item.alt === '채팅 아이콘') handleChat();
          }}
        >
          <Icon src={item.icon} alt={item.alt} />
          {item.DeliveryText && (
            <DeliveryText>{item.DeliveryText()}</DeliveryText>
          )}
          <InfoTitle>{item.title}</InfoTitle>
          {item.ChatText && <ChatText>{item.ChatText()}</ChatText>}
        </InfoItem>
      ))}
    </InfoContainer>
  );
};

export default MeetingInfo;
