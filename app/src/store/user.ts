import { atom, selectorFamily } from 'recoil';

import { ValueOf } from '~/types';
import { UserDocument } from '~/types/user';

export const userState = atom<UserDocument | null | undefined>({
  key: 'userState',
  default: undefined,
});

export const userFieldValueState = selectorFamily<
  ValueOf<UserDocument> | null | undefined,
  keyof UserDocument
>({
  key: 'userFieldValueState',
  get:
    (key) =>
    ({ get }) => {
      const user = get(userState);
      if (!user) return undefined;
      return user[key];
    },
  set:
    (key) =>
    ({ get, set }, newValue) => {
      const user = get(userState);
      if (!user) return;
      set(userState, { ...user, [key]: newValue });
    },
});

export const publicUserState = atom<UserDocument | null | undefined>({
  key: 'publicUserState',
  default: undefined,
});
