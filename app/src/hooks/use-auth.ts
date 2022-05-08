import { useCallback, useState } from 'react';
import { useResetRecoilState } from 'recoil';

import {
  signInWithPassword,
  signOut,
  signUpWithPassword,
} from '~/services/auth';
import { showOnBoardingAlert } from '~/store/auth';
import { humanizeFirebaseErrorMessage } from '~/utils/firebase-auth';

export function useSignUpWithPasswordAction() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSignUpWithPassword = useCallback(
    async (email: string, password: string) => {
      try {
        setError(null);
        setIsLoading(true);
        await signUpWithPassword(email, password);
      } catch (err: any) {
        setError(humanizeFirebaseErrorMessage(err.message));
      } finally {
        setIsLoading(false);
      }
    },
    [],
  );

  return { handleSignUpWithPassword, isLoading, error };
}

export function useSignInWithPasswordAction() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSignInWithPassword = useCallback(
    async (email: string, password: string) => {
      try {
        setError(null);
        setIsLoading(true);
        await signInWithPassword(email, password);
      } catch (err: any) {
        setError(humanizeFirebaseErrorMessage(err.message));
      } finally {
        setIsLoading(false);
      }
    },
    [],
  );

  return { handleSignInWithPassword, isLoading, error };
}

export function useSignOutAction() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const resetShowOnBoardingAlert = useResetRecoilState(showOnBoardingAlert);

  const handleSignOut = useCallback(async () => {
    try {
      setError(null);
      setIsLoading(true);
      await signOut();
      resetShowOnBoardingAlert();
    } catch (err: any) {
      setError(humanizeFirebaseErrorMessage(err.message));
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { handleSignOut, isLoading, error };
}
