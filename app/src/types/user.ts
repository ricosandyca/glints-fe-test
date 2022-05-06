import firestore from 'firebase/firestore';

export const USERS_COLLECTION = 'users';

export type User = {
  uid: string;
  name: string | null;
  email: string | null;
  created_at: firestore.Timestamp;
  updated_at: firestore.Timestamp;
};
