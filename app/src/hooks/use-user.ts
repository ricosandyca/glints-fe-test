import { useToast } from '@chakra-ui/react';
import { useCallback, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { getUserdataStoragePath } from '~/services/storage';

import {
  useFileUploadAction,
  useFileURLFetcher,
} from '~/hooks/use-file-upload';
import { updateUser } from '~/services/user';
import { userFieldValueState } from '~/store/user';
import { User, UserDocument, UserWorkExperience } from '~/types/user';
import { validateFileImage } from '~/utils/file';

export function useUserUpdateAction<T extends keyof User>(key: T) {
  const userId = useRecoilValue(
    userFieldValueState('_id'),
  ) as UserDocument['_id'];
  const value = useRecoilValue(userFieldValueState(key)) as User[T];
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleUpdateValue = useCallback(
    async (newValue: User[T]) => {
      // prevent unnecessary updating
      if (JSON.stringify(newValue) === JSON.stringify(value)) return;
      try {
        setError(null);
        setIsLoading(true);
        // update user data in firestore
        await updateUser(userId, { [key]: newValue });
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    },
    [userId],
  );

  return { userId, value, handleUpdateValue, isLoading, error };
}

export function useUserProfilePictureUploadAction() {
  const toast = useToast();
  const {
    userId,
    value: profilePicture,
    isLoading: isUpdating,
    handleUpdateValue: handleUpdateProfilePicture,
  } = useUserUpdateAction('profile_picture');
  const {
    isLoading: isUploading,
    handleUploadFile,
    percentage,
  } = useFileUploadAction();
  const { isLoading: isDownloading, downloadURL } =
    useFileURLFetcher(profilePicture);

  const handleUploadProfilePicture = useCallback(
    async (file: File) => {
      // validate profile picture
      if (!validateFileImage(file)) {
        return toast({
          status: 'error',
          title: 'Invalid image',
        });
      }
      // start uploading file to the cloud
      // the upload user's profile picture on success
      handleUploadFile(
        getUserdataStoragePath(userId, file.name),
        file,
        handleUpdateProfilePicture,
      );
    },
    [userId],
  );

  const isLoading = isUpdating || isDownloading || isUploading;

  return { handleUploadProfilePicture, downloadURL, percentage, isLoading };
}

export function useUserWorkExperiencesUpdateAction() {
  const {
    value: workExperiences,
    handleUpdateValue: handleUpdateWorkExperiences,
    isLoading,
    error,
  } = useUserUpdateAction('work_experiences');

  const handleAddWorkExperience = useCallback(
    async (newWorkExperience: UserWorkExperience) => {
      await handleUpdateWorkExperiences([
        ...workExperiences,
        newWorkExperience,
      ]);
    },
    [workExperiences],
  );

  const handleUpdateWorkExperience = useCallback(
    async (
      workExperienceId: string,
      data: Partial<Omit<UserWorkExperience, 'id'>>,
    ) => {
      const newWorkExperiences = workExperiences.map((we) => {
        if (we.id === workExperienceId) return { ...we, ...data };
        return we;
      });
      await handleUpdateWorkExperiences(newWorkExperiences);
    },
    [workExperiences],
  );

  const handleReplaceWorkExperiences = useCallback(
    async (newWorkExperiences: UserWorkExperience[]) => {
      await handleUpdateWorkExperiences(newWorkExperiences);
    },
    [],
  );

  return {
    handleUpdateWorkExperience,
    handleAddWorkExperience,
    handleReplaceWorkExperiences,
    isLoading,
    error,
  };
}
