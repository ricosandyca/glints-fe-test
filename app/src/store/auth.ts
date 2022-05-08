import { atom } from 'recoil';

import { persistentEffect } from '~/store/effects/persistent-effect';

export const authState = atom<
  { uid: string; email: string } | null | undefined
>({
  key: 'authState',
  default: null,
});

export const showOnBoardingAlert = atom<boolean>({
  key: 'showOnBoardingAlert',
  default: true,
  effects: [persistentEffect('show-on-boarding-alert')],
});
