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

export async function updateUser(userId: string, userData: Partial<User>) {
  const newUserData: Partial<User> = {
    ...userData,
    updated_at: Timestamp.fromDate(new Date()),
  };
  const userRef = db.collection(USERS_COLLECTION).doc(userId);
  await userRef.set(newUserData, { merge: true });
  return userRef.id;
}
