import firebase from 'firebase/compat/app';
import { Timestamp } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';

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
    is_public: false,
    key: uuidv4(),
    name: defaultName,
    work_experiences: [],
    email,
    uid,
    date_of_birth: null,
    profile_picture: null,
    summary: null,
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

export async function isUserKeyExistent(key: string, userId: string) {
  const userQuery = db
    .collection(USERS_COLLECTION)
    .where('key', '==', key)
    .where(firebase.firestore.FieldPath.documentId(), '!=', userId)
    .limit(1);
  const userQuerySnap = await userQuery.get();
  return userQuerySnap.size >= 1;
}

export async function getPublicUser(key: string): Promise<UserDocument | null> {
  const userQuery = db
    .collection(USERS_COLLECTION)
    .where('key', '==', key)
    .where('is_public', '==', true)
    .limit(1);
  const userQuerySnap = await userQuery.get();
  let user: UserDocument | null = null;
  userQuerySnap.forEach((snap) => {
    if (!snap.exists) return;
    user = {
      ...(snap.data() as User),
      _id: snap.id,
    };
  });
  return user;
}
