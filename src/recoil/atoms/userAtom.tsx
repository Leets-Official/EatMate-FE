import { atom } from 'recoil';

export const signupAtom = atom<{
  year: number | null;
  month: number | null;
  day: number | null;
  gender: string;
  phoneNumber: string;
  mbti: string;
  nickname: string;
  studentNumber: number;
  profilePhoto: string | undefined;
}>({
  key: 'signupAtom',
  default: {
    year: 0,
    month: 0,
    day: 0,
    gender: '',
    phoneNumber: '',
    mbti: '',
    nickname: '',
    studentNumber: 0,
    profilePhoto: undefined,
  },
});
