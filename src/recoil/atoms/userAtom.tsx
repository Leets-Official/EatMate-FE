import { atom } from 'recoil';

export const birthdayState = atom<string>({
  key: 'birthdayState',
  default: '',
});

export const genderState = atom<'남성' | '여성' | ''>({
  key: 'genderState',
  default: '',
});

export const phoneNumberState = atom<string>({
  key: 'phoneNumberState',
  default: '',
});

export const mbtiState = atom<string>({
  key: 'mbtiState',
  default: '',
});

export const nicknameState = atom<string>({
  key: 'nicknameState',
  default: '',
});

export const studentIdState = atom<string>({
  key: 'studentIdState',
  default: '',
});

export const profileImgState = atom<File | null>({
  key: 'profileImgState',
  default: null,
});
