import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';

import { getPublicUser } from '~/services/user';
import { publicUserState } from '~/store/user';

export function usePubliUserFetcher(userKey: string) {
  const [publicUser, setPublicUser] = useRecoilState(publicUserState);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getPublicUser(userKey)
      .then(setPublicUser)
      .catch((err) => setError(err.message))
      .finally(() => setIsLoading(false));
  }, [userKey]);

  return { publicUser, isLoading, error };
}
