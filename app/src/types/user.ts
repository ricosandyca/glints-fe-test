import firestore from 'firebase/firestore';

export const USERS_COLLECTION = 'users';

export type UserWorkExperience = {
  id: string;
  job_title: string;
  company: string;
  company_logo?: string;
  job_description?: string;
  start_date: firestore.Timestamp;
  end_date?: firestore.Timestamp;
};

export type User = {
  uid: string;
  email: string;
  key: string; // unique user key to define their vanity URL
  is_private: boolean; // to determine is the user's profile is viewable to other users
  name: string;
  profile_picture?: string;
  age?: number;
  work_experiences: UserWorkExperience[];
  created_at: firestore.Timestamp;
  updated_at: firestore.Timestamp;
};
