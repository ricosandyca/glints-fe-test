import firebase from 'firebase/compat/app';
import { ComponentType, FC, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

import Loading from '~/pages/loading';
import { getUserListener, initUser } from '~/services/user';
import { authState } from '~/store/auth';
import { userState } from '~/store/user';

export function withFirebaseAuth<T>(Content: ComponentType<T>): FC<T> {
  return function FirebaseAuthContent(props: T) {
    const [auth, setAuth] = useRecoilState(authState);
    const setUser = useSetRecoilState(userState);
    const [isAuthReady, setIsAuthReady] = useState(false);
    const [isUserReady, setIsUserReady] = useState(false);

    // listen firebase auth state
    useEffect(() => {
      return firebase.auth().onAuthStateChanged((auth) => {
        setAuth(auth ? { uid: auth.uid, email: auth.email! } : null);
        setIsAuthReady(true);
      });
    }, []);

    // if authenticated, subscribe to user document
    useEffect(() => {
      if (!isAuthReady) return;
      const uid = auth?.uid;
      if (!uid) {
        // if user isn't authenticated
        setUser(null);
        setIsUserReady(true);
        return;
      }

      // if user authenticated
      return getUserListener(uid, async (user) => {
        // optionally create a new user document
        // if current user doesn't have it yet
        if (!user) return await initUser(auth.uid, auth.email);
        setUser(user);
        setIsUserReady(true);
      });
    }, [auth, isAuthReady]);

    if (!isUserReady || !isAuthReady) return <Loading />;

    return <Content {...props} />;
  };
}

export function withAuthorizedUser<T>(Content: ComponentType<T>): FC<T> {
  return function AuthorizedUserContent(props) {
    const auth = useRecoilValue(authState);
    // if the user isn't authenticated
    if (!auth) return <Navigate to="/auth/signin" />;

    return <Content {...props} />;
  };
}

export function withUnauthorizedUser<T>(Content: ComponentType<T>): FC<T> {
  return function AuthorizedUserContent(props) {
    const auth = useRecoilValue(authState);

    if (!auth) return <Content {...props} />;

    // if user isn't authenticated
    return <Navigate to="/app" />;
  };
}
