import firebase from 'firebase/compat/app';
import { Timestamp } from 'firebase/firestore';

import { User, UserDocument, USERS_COLLECTION } from '~/types/user';

const db = firebase.firestore();

export function getUserListener(
  id: string,
  cb: (user: UserDocument | null) => any,
) {
  return db
    .collection(USERS_COLLECTION)
    .doc(id)
    .onSnapshot((snap) => {
      if (!snap.exists) return cb(null);
      return cb({
        ...(snap.data() as User),
        _id: snap.id,
      });
    });
}

export async function initUser(uid: string, email: string) {
  const defaultName = email.split('@')[0] ?? null;
  const userData: User = {
    created_at: Timestamp.fromDate(new Date()),
    updated_at: Timestamp.fromDate(new Date()),
    is_private: true,
    key: defaultName,
    name: defaultName,
    work_experiences: [],
    email,
    uid,
  };
  const userRef = db.collection(USERS_COLLECTION).doc(uid);
  await userRef.set(userData);
  return userRef.id;
}

export async function updateUser(userId: string, userData: Partial<User>) {
  const newUserData: Partial<User> = {
    ...userData,
    updated_at: Timestamp.fromDate(new Date()),
  };
  const userRef = db.collection(USERS_COLLECTION).doc(userId);
  await userRef.update(newUserData);
  return userRef.id;
}
