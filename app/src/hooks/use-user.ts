import { Timestamp } from 'firebase/firestore';
import { useCallback, useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

import { getUserListener, updateUser } from '~/services/user';
import { authState } from '~/store/auth';
import { userFieldValueState, userState } from '~/store/user';
import { User, UserDocument } from '~/types/user';

export function useUserSubscriber() {
  const auth = useRecoilValue(authState);
  const [user, setUser] = useRecoilState(userState);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const uid = auth?.uid;
    if (!uid) return;
    return getUserListener(uid, (user) => {
      setUser(user);
      setIsLoading(false);
    });
  }, [auth]);

  return { user, isLoading };
}

export function useUserUpdateAction<T extends keyof User>(key: T) {
  const auth = useRecoilValue(authState);
  const userId = useRecoilValue(
    userFieldValueState('_id'),
  ) as UserDocument['_id'];
  const value = useRecoilValue(userFieldValueState(key)) as User[T];
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleUpdateValue = useCallback(
    async (newValue: User[T]) => {
      // map new user data into object
      const newUserData: Partial<User> = {
        [key]: newValue,
      };

      // if user not authorized
      if (!auth) return;
      // prevent unnecessary updating
      if (JSON.stringify(newValue) === JSON.stringify(value)) return;

      try {
        setError(null);
        setIsLoading(true);

        // if user document doesn't exist in the collection
        if (!userId) {
          const defaultName = auth.email.split('@')[0] ?? null;
          newUserData.uid = auth.uid;
          newUserData.email = auth.email;
          newUserData.name = defaultName;
          newUserData.key = defaultName;
          newUserData.is_private = true;
          newUserData.created_at = Timestamp.fromDate(new Date());
        }

        // update user data in firestore
        await updateUser(userId, newUserData);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    },
    [userId, auth],
  );

  return { value, handleUpdateValue, isLoading, error };
}
