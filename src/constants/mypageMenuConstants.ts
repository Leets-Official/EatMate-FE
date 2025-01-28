import CreatedMeetingIcon from '@/assets/images/ic_my_create.svg';
import ParticipatedMeetingIcon from '@/assets/images/ic_my_participate.svg';
import NoticeIcon from '@/assets/images/ic_my_notice.svg';
import ReportedUserIcon from '@/assets/images/ic_my_check.svg';
import BlockedUserIcon from '@/assets/images/ic_my_block.svg';
import FAQIcon from '@/assets/images/ic_my_faq.svg';
import TermsIcon from '@/assets/images/ic_my_pin.svg';
import PrivacyIcon from '@/assets/images/ic_my_search.svg';

export const mypageMenuItems = [
  {
    category: '모임 활동',
    items: [
      {
        icon: CreatedMeetingIcon,
        label: '내가 생성한 모임',
        path: '/mypage/created-meetings',
      },
      {
        icon: ParticipatedMeetingIcon,
        label: '내가 참여한 모임',
        path: '/mypage/participated-meetings',
      },
    ],
  },
  {
    category: '커뮤니티',
    items: [
      {
        icon: NoticeIcon,
        label: '공지사항',
        path: '/mypage/notice',
      },
      {
        icon: ReportedUserIcon,
        label: '신고한 사용자 관리',
        path: '/mypage/reported-users',
      },
      {
        icon: BlockedUserIcon,
        label: '차단한 사용자 관리',
        path: '/mypage/blocked-users',
      },
    ],
  },
  {
    category: '이용 안내',
    items: [
      {
        icon: FAQIcon,
        label: 'FAQ',
        path: '/mypage/help',
      },
      {
        icon: TermsIcon,
        label: '서비스 이용약관',
        path: '/policy-details/1',
      },
      {
        icon: PrivacyIcon,
        label: '개인정보 처리방침',
        path: '/policy-details/2',
      },
    ],
  },
];
