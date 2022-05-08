import { BoxProps } from '@chakra-ui/react';
import { FC, memo } from 'react';

import ImageInput from '~/components/ImageInput';
import { useUserProfilePictureUploadAction } from '~/hooks/use-user';

const UserProfilePictureInput: FC<BoxProps> = (props) => {
  const { handleUploadProfilePicture, downloadURL, isLoading, percentage } =
    useUserProfilePictureUploadAction();

  return (
    <ImageInput
      onFileUpload={handleUploadProfilePicture}
      previewImageURL={downloadURL}
      isUploading={isLoading}
      uploadPercentage={percentage}
      {...props}
    />
  );
};

export default memo(UserProfilePictureInput);
