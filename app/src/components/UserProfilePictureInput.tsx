import { Box, BoxProps, Button, Input } from '@chakra-ui/react';
import { FC, memo, useRef } from 'react';
import { useUserProfilePictureUploadAction } from '~/hooks/use-user';

const UserProfilePictureInput: FC<BoxProps> = (props) => {
  const thumbnailInputRef = useRef<HTMLInputElement>(null);
  const { handleUploadProfilePicture } = useUserProfilePictureUploadAction();

  return (
    <Box {...props}>
      {/* Hidden file input */}
      <Input
        ref={thumbnailInputRef}
        type="file"
        multiple={false}
        onChange={(e) => {
          const file = e.target.files && e.target.files[0];
          file && handleUploadProfilePicture(file);
        }}
        accept="image/*"
        hidden
      />
      <Button onClick={() => thumbnailInputRef.current?.click()}>
        Click ME
      </Button>
    </Box>
  );
};

export default memo(UserProfilePictureInput);
