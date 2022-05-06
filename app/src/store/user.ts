import { atom, selectorFamily } from 'recoil';

import { ValueOf } from '~/types';
import { UserDocument } from '~/types/user';

export const userState = atom<UserDocument | null | undefined>({
  key: 'userState',
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
});
