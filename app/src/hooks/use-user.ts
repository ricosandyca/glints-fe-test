import { useToast } from '@chakra-ui/react';
import { useCallback, useMemo, useState } from 'react';
import { SetterOrUpdater, useRecoilState, useRecoilValue } from 'recoil';
import { getUserdataStoragePath } from '~/services/storage';

import {
  useFileUploadAction,
  useFileURLFetcher,
} from '~/hooks/use-file-upload';
import { isUserKeyExistent, updateUser } from '~/services/user';
import { userFieldValueState } from '~/store/user';
import { User, UserDocument, UserWorkExperience } from '~/types/user';
import { validateFileImage } from '~/utils/file';

export function useUserUpdateAction<T extends keyof User>(key: T) {
  const userId = useRecoilValue(
    userFieldValueState('_id'),
  ) as UserDocument['_id'];
  const [value, setValue] = useRecoilState(userFieldValueState(key)) as [
    User[T],
    SetterOrUpdater<User[T] | undefined>,
  ];
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleUpdateValue = useCallback(
    async (newValue: User[T]) => {
      // prevent unnecessary update
      if (newValue === value) return;
      try {
        setError(null);
        setIsLoading(true);
        // immediately update local data
        setValue(newValue);
        // update user data in firestore
        await updateUser(userId, { [key]: newValue });
        return true;
      } catch (err: any) {
        setError(err.message);
        return false;
      } finally {
        setIsLoading(false);
      }
    },
    [userId, value],
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
    [userId, handleUpdateProfilePicture],
  );

  const handleDeleteProfilePicture = useCallback(async () => {
    await handleUpdateProfilePicture(null);
  }, [handleUpdateProfilePicture]);

  const isLoading = isUpdating || isDownloading || isUploading;

  return {
    handleUploadProfilePicture,
    handleDeleteProfilePicture,
    downloadURL,
    percentage,
    isLoading,
  };
}

export function useUserWorkExperiencesUpdateAction(workExperienceId?: string) {
  const {
    userId,
    value: workExperiences,
    handleUpdateValue: handleUpdateWorkExperiences,
    isLoading,
    error,
  } = useUserUpdateAction('work_experiences');

  // get single work experience data
  const workExperience = useMemo(() => {
    return workExperiences.find(({ id }) => id === workExperienceId);
  }, [workExperienceId, workExperiences]);

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
    async (data: Partial<Omit<UserWorkExperience, 'id'>>) => {
      if (!workExperienceId) return;
      const newWorkExperiences = workExperiences.map((we) => {
        if (we.id === workExperienceId) return { ...we, ...data };
        return we;
      });
      // prevent unnecessary update
      if (
        JSON.stringify(newWorkExperiences) === JSON.stringify(workExperiences)
      )
        return;
      await handleUpdateWorkExperiences(newWorkExperiences);
    },
    [workExperiences, workExperienceId],
  );

  const handleReplaceWorkExperiences = useCallback(
    async (newWorkExperiences: UserWorkExperience[]) => {
      await handleUpdateWorkExperiences(newWorkExperiences);
    },
    [],
  );

  const handleDeleteWorkExperience = useCallback(async () => {
    if (!workExperienceId) return;
    const newWorkExperiences = workExperiences.filter(
      ({ id }) => workExperienceId !== id,
    );
    await handleUpdateWorkExperiences(newWorkExperiences);
  }, [workExperiences]);

  return {
    userId,
    workExperience,
    workExperiences,
    handleUpdateWorkExperience,
    handleAddWorkExperience,
    handleReplaceWorkExperiences,
    handleDeleteWorkExperience,
    isLoading,
    error,
  };
}

export function useUserCompanyLogoUploadAction(workExperienceId: string) {
  const toast = useToast();
  const workExperiences = useRecoilValue(
    userFieldValueState('work_experiences'),
  ) as UserWorkExperience[];

  // get single work experience data
  const workExperience = useMemo(() => {
    return workExperiences.find(({ id }) => id === workExperienceId);
  }, [workExperienceId, workExperiences]);

  const {
    userId,
    handleUpdateWorkExperience,
    isLoading: isUpdating,
  } = useUserWorkExperiencesUpdateAction(workExperienceId);
  const {
    isLoading: isUploading,
    handleUploadFile,
    percentage,
  } = useFileUploadAction();
  const { isLoading: isDownloading, downloadURL } = useFileURLFetcher(
    workExperience?.company_logo,
  );

  const isLoading = isUpdating || isDownloading || isUploading;

  const handleUploadCompanyLogo = useCallback(
    async (file: File) => {
      // validate profile picture
      if (!validateFileImage(file)) {
        return toast({
          status: 'error',
          title: 'Invalid image',
        });
      }
      // start uploading file to the cloud
      // the update the company logo in the user document
      handleUploadFile(
        getUserdataStoragePath(userId, file.name),
        file,
        (fileURL) => handleUpdateWorkExperience({ company_logo: fileURL }),
      );
    },
    [userId, handleUpdateWorkExperience],
  );

  const handleDeleteCompanyLogo = useCallback(async () => {
    await handleUpdateWorkExperience({ company_logo: null });
  }, [handleUpdateWorkExperience]);

  return {
    handleUploadCompanyLogo,
    handleDeleteCompanyLogo,
    isLoading,
    downloadURL,
    percentage,
  };
}

export function useUserKeyUpdateAction() {
  const forbiddenKeys = ['auth', 'app'];
  const toast = useToast();
  const { userId, value, handleUpdateValue } = useUserUpdateAction('key');
  const { value: isPublic, handleUpdateValue: handleUpdateIsPublic } =
    useUserUpdateAction('is_public');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleTogglePublicProfile = useCallback(() => {
    handleUpdateIsPublic(!isPublic);
  }, [isPublic, handleUpdateIsPublic]);

  const handleUpdateUserKey = useCallback(
    async (newKey: string) => {
      // validate key
      try {
        setError(null);
        setIsLoading(true);
        // forbid using app routes
        if (forbiddenKeys.includes(newKey))
          throw new Error('Key is already used by the app');

        // validate key with other user document
        const user = await isUserKeyExistent(newKey, userId);
        // if the key is already in use
        if (user) throw new Error('Key is already used by another user');

        // update user data in firestore
        await handleUpdateValue(newKey);
        return true;
      } catch (err: any) {
        setError(err.message);
        toast({
          status: 'error',
          title: err.message,
        });
        return false;
      } finally {
        setIsLoading(false);
      }
    },
    [handleUpdateValue],
  );

  return {
    key: value,
    isPublic,
    handleUpdateUserKey,
    handleTogglePublicProfile,
    isLoading,
    error,
  };
}
