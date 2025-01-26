import React from 'react';
import PeopleIcon from '@/assets/images/ic_people_line.svg';
import LocationIcon from '@/assets/images/ic_locate.svg';
import CalendarIcon from '@/assets/images/ic_calendar.svg';
import ChatIcon from '@/assets/images/ic_chat.svg';

interface MeetingInfoContent {
  icon: string;
  alt: string;
  title: (...args: any[]) => React.ReactNode;
  highlightedText?: (chatTime: string) => string;
}

export const meetingInfoContents: MeetingInfoContent[] = [
  {
    icon: PeopleIcon,
    alt: '참가자 아이콘',
    title: (gender: string): string => gender,
  },
  {
    icon: LocationIcon,
    alt: '위치 아이콘',
    title: (location: string, placeName: string): React.ReactNode => (
      <>
        {location} <br /> {placeName}
      </>
    ),
  },
  {
    icon: CalendarIcon,
    alt: '캘린더 아이콘',
    title: (time: string): React.ReactNode => (
      <>
        {time.split(' ')[0]} <br /> {time.split(' ')[1]}
      </>
    ),
  },
  {
    icon: ChatIcon,
    alt: '채팅 아이콘',
    title: (): string => '채팅',
    highlightedText: (chatTime: string): string => `${chatTime} 전 대화`,
  },
];
