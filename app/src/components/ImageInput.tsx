import {
  Box,
  BoxProps,
  Center,
  Icon,
  IconButton,
  Image,
  Input,
  Progress,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react';
import { FC, memo, useRef } from 'react';
import { BsImage } from 'react-icons/bs';
import { IoMdClose } from 'react-icons/io';

export type ImageInputProps = BoxProps & {
  label?: string;
  onFileUpload: (file: File) => any;
  previewImageURL?: string;
  isUploading: boolean;
  uploadPercentage?: number;
  onDeleteFile?: () => any;
};

const ImageInput: FC<ImageInputProps> = ({
  onFileUpload,
  previewImageURL,
  isUploading,
  uploadPercentage,
  onDeleteFile,
  ...boxProps
}) => {
  const thumbnailInputRef = useRef<HTMLInputElement>(null);
  const hoverBg = useColorModeValue('whiteAlpha.700', 'blackAlpha.700');

  return (
    <Box
      position="relative"
      transitionDuration=".2s"
      fontSize="5xl"
      _hover={{
        '.delete-button': {
          opacity: 1,
        },
      }}
      {...boxProps}
    >
      {/* Hidden file input */}
      <Input
        ref={thumbnailInputRef}
        type="file"
        multiple={false}
        onChange={(e) => {
          const file = e.target.files && e.target.files[0];
          file && onFileUpload(file);
        }}
        accept="image/*"
        hidden
      />

      {onDeleteFile && (
        <IconButton
          className="delete-button"
          opacity={0}
          aria-label="Delete image button"
          size="xs"
          position="absolute"
          top={-2}
          right={-2}
          zIndex={5}
          colorScheme="red"
          variant="solid"
          rounded="full"
          transitionDuration=".2s"
          icon={<Icon fontSize="sm" as={IoMdClose} />}
          onClick={onDeleteFile}
        />
      )}

      {/* Upload image placeholder */}
      <VStack
        position="relative"
        zIndex={3}
        w="full"
        h="full"
        spacing={4}
        _hover={{ opacity: 0.5 }}
        onClick={() => thumbnailInputRef.current?.click()}
        rounded={boxProps.rounded ?? 'lg'}
        overflow="hidden"
      >
        <Center
          position="relative"
          w="full"
          h="full"
          borderWidth={previewImageURL ? '0' : '1px'}
          bgSize="100%"
          bgPosition="center"
          bgRepeat="no-repeat"
          overflow="hidden"
          borderStyle="dashed"
          cursor="pointer"
        >
          {!previewImageURL && (
            <Icon zIndex={1} opacity={0.25} fontSize="inherit" as={BsImage} />
          )}

          {previewImageURL && (
            <Image
              position="absolute"
              zIndex={2}
              top={0}
              h="full"
              w="full"
              alt="Course image"
              src={previewImageURL}
              objectFit="cover"
            />
          )}

          {/* Upload progress */}
          {isUploading && (
            <Center
              bg={hoverBg}
              w="full"
              h="full"
              zIndex={3}
              position="absolute"
            >
              <Progress
                colorScheme="primary"
                value={uploadPercentage}
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

export default memo(ImageInput);
