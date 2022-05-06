import firebase from 'firebase/compat/app';
import { ComponentType, FC, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import Loading from '~/pages/loading';
import { authState } from '~/store/auth';

export function withFirebaseAuth<T>(Content: ComponentType<T>): FC<T> {
  return function FirebaseAuthContent(props: T) {
    const setAuth = useSetRecoilState(authState);
    const [isReady, setIsReady] = useState(false);

    // listen firebase auth state
    useEffect(() => {
      return firebase.auth().onAuthStateChanged((auth) => {
        setAuth(auth ? { uid: auth.uid, email: auth.email! } : null);
        setIsReady(true);
      });
    }, []);

    if (!isReady) return <Loading />;

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
