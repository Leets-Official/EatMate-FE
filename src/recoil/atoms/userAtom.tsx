import { atom } from 'recoil';

export const signupAtom = atom<{
  year: number | null;
  month: number | null;
  day: number | null;
  gender: string;
  phoneNumber: string;
  mbti: string;
  nickname: string;
  studentNumber: number | null;
  profilePhoto: string | undefined;
}>({
  key: 'signupAtom',
  default: {
    year: null,
    month: null,
    day: null,
    gender: '',
    phoneNumber: '',
    mbti: '',
    nickname: '',
    studentNumber: null,
    profilePhoto: undefined,
  },
});
