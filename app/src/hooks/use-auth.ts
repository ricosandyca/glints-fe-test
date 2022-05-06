import { useCallback, useState } from 'react';

import {
  signInWithPassword,
  signOut,
  signUpWithPassword,
} from '~/services/auth';
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

  const handleSignOut = useCallback(async () => {
    try {
      setError(null);
      setIsLoading(true);
      await signOut();
    } catch (err: any) {
      setError(humanizeFirebaseErrorMessage(err.message));
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { handleSignOut, isLoading, error };
}
