import colors from '@chakra-ui/theme/foundations/colors';
import firestore from 'firebase/firestore';

import { WithFirestoreId } from '.';

export const USERS_COLLECTION = 'users';

export type UserWorkExperience = {
  id: string;
  job_title: string;
  company: string;
  company_logo: string | null;
  job_description: string | null;
  start_date: firestore.Timestamp;
  end_date: firestore.Timestamp | null;
};

export type User = {
  uid: string;
  email: string;
  key: string; // unique user key to define their vanity URL
  is_public: boolean; // to determine is the user's profile is viewable to other users
  name: string;
  summary: string | null;
  profile_picture: string | null;
  date_of_birth: firestore.Timestamp | null;
  work_experiences: UserWorkExperience[];
  color_scheme: keyof typeof colors;
  created_at: firestore.Timestamp;
  updated_at: firestore.Timestamp;
};

export type UserDocument = WithFirestoreId<User>;
