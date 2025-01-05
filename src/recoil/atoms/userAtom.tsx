import { atom } from 'recoil';

export type SignupState = {
  year: string;
  month: string;
  day: string;
  gender: string;
  phoneNumber: string;
  mbti: string;
  nickname: string;
  studentId: string;
  profilePhoto?: string;
};

export const signupAtom = atom<SignupState>({
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
