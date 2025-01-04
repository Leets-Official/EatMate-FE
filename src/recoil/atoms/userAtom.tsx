import { atom } from 'recoil';

export const signupAtom = atom({
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
    profilePhoto: null,
  },
});
