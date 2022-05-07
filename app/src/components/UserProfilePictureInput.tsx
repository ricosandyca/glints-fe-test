import {
  Box,
  BoxProps,
  Center,
  Icon,
  Image,
  Input,
  Progress,
  Text,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react';
import { FC, memo, useRef } from 'react';
import { BsImage } from 'react-icons/bs';

import { useUserProfilePictureUploadAction } from '~/hooks/use-user';

const UserProfilePictureInput: FC<BoxProps> = (props) => {
  const thumbnailInputRef = useRef<HTMLInputElement>(null);
  const { handleUploadProfilePicture, downloadURL, isLoading, percentage } =
    useUserProfilePictureUploadAction();
  const hoverBg = useColorModeValue('whiteAlpha.700', 'blackAlpha.700');

  return (
    <Box
      transitionDuration=".2s"
      onClick={() => thumbnailInputRef.current?.click()}
      _hover={{ opacity: 0.5 }}
      {...props}
    >
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

      {/* Upload image placeholder */}
      <VStack w="full" h="full" spacing={4}>
        <Center
          position="relative"
          w="full"
          h="full"
          borderWidth="1px"
          rounded="lg"
          bgSize="100%"
          bgPosition="center"
          bgRepeat="no-repeat"
          overflow="hidden"
          borderStyle="dashed"
          cursor="pointer"
        >
          <VStack w="full" h="full" zIndex={1} opacity={0.5} justify="center">
            <Icon fontSize="5xl" as={BsImage} />
            <Text fontSize="sm">Profile Picture</Text>
          </VStack>

          {downloadURL && (
            <Image
              position="absolute"
              zIndex={2}
              top={0}
              h="full"
              w="full"
              alt="Course image"
              src={downloadURL}
              objectFit="cover"
              bg="bg"
            />
          )}

          {/* Upload progress */}
          {isLoading && (
            <Center
              bg={hoverBg}
              w="full"
              h="full"
              zIndex={3}
              position="absolute"
            >
              <Progress
                colorScheme="primary"
                value={percentage}
                w="60%"
                size="xs"
                rounded="full"
              />
            </Center>
          )}
        </Center>
      </VStack>
    </Box>
  );
};

export default memo(UserProfilePictureInput);
