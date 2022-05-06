import firebase from 'firebase/compat/app';

const auth = firebase.auth();

export async function signUpWithPassword(email: string, password: string) {
  return await auth.createUserWithEmailAndPassword(email, password);
}

export async function signInWithPassword(email: string, password: string) {
  return await auth.signInWithEmailAndPassword(email, password);
}

export async function signOut() {
  return await auth.signOut();
}
