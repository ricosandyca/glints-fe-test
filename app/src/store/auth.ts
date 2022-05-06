import { atom } from 'recoil';

export const authState = atom<
  { uid: string; email: string } | null | undefined
>({
  key: 'authState',
  default: null,
});
