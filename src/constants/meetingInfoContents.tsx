import React from 'react';
import PeopleIcon from '@/assets/images/ic_people_line.svg';
import LocationIcon from '@/assets/images/ic_locate.svg';
import CalendarIcon from '@/assets/images/ic_calendar.svg';
import ClockIcon from '@/assets/images/ic_clock_line.svg';
import ChatIcon from '@/assets/images/ic_chat.svg';
import { formatTimeWithMeridiem } from '@/utils/dateUtils';

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
    title: (gender: string): string => {
      switch (gender) {
        case 'ALL':
          return '모두 가능';
        case 'MALE':
          return '남자만';
        case 'FEMALE':
          return '여자만';
        default:
          return '지정되지 않음';
      }
    },
  },
  {
    icon: LocationIcon,
    alt: '위치 아이콘',
    title: (location: string): string => location,
  },
  {
    icon: CalendarIcon,
    alt: '캘린더 아이콘',
    title: (time: string): React.ReactNode => {
      return formatTimeWithMeridiem(time);
    },
  },
  {
    icon: ChatIcon,
    alt: '채팅 아이콘',
    title: (): string => '채팅',
    highlightedText: (chatTime: string): string => `${chatTime} 전 대화`,
  },
];
