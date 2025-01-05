import { atom } from 'recoil';

export const signupAtom = atom<{
  year: string;
  month: string;
  day: string;
  gender: string;
  phoneNumber: string;
  mbti: string;
  nickname: string;
  studentId: string;
  profilePhoto: string | undefined; // 타입 수정
}>({
  key: 'signupAtom',
  default: {
    year: '',
    month: '',
    day: '',
    gender: '',
    phoneNumber: '',
    mbti: '',
    nickname: '',
    studentId: '',
    profilePhoto: undefined,
  },
});
