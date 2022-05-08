import firebase from 'firebase/compat/app';

import { initUser } from '~/services/user';

const auth = firebase.auth();

export async function signUpWithPassword(email: string, password: string) {
  const cred = await auth.createUserWithEmailAndPassword(email, password);
  // create user document immediately after user registered
  if (cred.user) await initUser(cred.user.uid, cred.user.email!);
}

export async function signInWithPassword(email: string, password: string) {
  return await auth.signInWithEmailAndPassword(email, password);
}

export async function signOut() {
  return await auth.signOut();
}
