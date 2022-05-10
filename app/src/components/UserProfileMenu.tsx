import {
  Box,
  BoxProps,
  Button,
  chakra,
  Collapse,
  Divider,
  FormControl,
  FormErrorMessage,
  HStack,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightElement,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger as OrigPopoverTrigger,
  Switch,
  Text,
  Tooltip,
  useClipboard,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import { FC, memo, useMemo } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { BiLogOutCircle } from 'react-icons/bi';
import { BsThreeDots, BsLink45Deg } from 'react-icons/bs';
import { FaGlobeAsia } from 'react-icons/fa';
import truncate from 'smart-truncate';

import ColorPicker from '~/components/ColorPicker';
import { useSignOutAction } from '~/hooks/use-auth';
import { useUserKeyUpdateAction, useUserUpdateAction } from '~/hooks/use-user';

const Form = chakra('form');

export type UserProfileMenuInput = {
  key: string;
};

// chakra library issue
// @see: https://github.com/chakra-ui/chakra-ui/issues/5896
export const PopoverTrigger: React.FC<{ children: React.ReactNode }> =
  OrigPopoverTrigger;

const UserProfileMenu: FC<BoxProps> = (props) => {
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isValid },
  } = useForm<UserProfileMenuInput>({
    mode: 'all',
  });
  const { value: colorScheme, handleUpdateValue: handleUpdateColorScheme } =
    useUserUpdateAction('color_scheme');
  const {
    key: initialKey,
    isPublic,
    handleUpdateUserKey,
    handleTogglePublicProfile,
    isLoading,
  } = useUserKeyUpdateAction();
  const { isOpen, onClose, onOpen } = useDisclosure({ defaultIsOpen: false });
  const { handleSignOut } = useSignOutAction();
  const { onCopy, hasCopied } = useClipboard(
    `${window.location.origin}/${initialKey}`,
  );

  const truncatedHost = useMemo(() => {
    return truncate(window.location.host, 8, { position: 4 });
  }, []);

  const onSubmit: SubmitHandler<UserProfileMenuInput> = async (data) => {
    const success = await handleUpdateUserKey(data.key);
    if (!success) setError('key', { message: '' });
  };

  return (
    <Popover
      isOpen={isOpen}
      onClose={onClose}
      onOpen={() => {
        reset();
        onOpen();
      }}
      placement="bottom-end"
      isLazy
    >
      <PopoverTrigger>
        <Box {...props}>
          <IconButton
            aria-label="Menu button"
            size="sm"
            variant="ghost"
            colorScheme="primary"
            icon={<Icon fontSize="xl" as={BsThreeDots} />}
          />
        </Box>
      </PopoverTrigger>
      <PopoverContent w="330px" _focus={{ shadow: 'none' }}>
        <PopoverBody px={0} py={2}>
          {/* Public toggle button */}
          <HStack px={4} py={2} spacing={3} w="full" justify="flex-start">
            <Icon color="subtext" fontSize="3xl" as={FaGlobeAsia} />
            <VStack flex={1} spacing={0.5} align="flex-start">
              <Text fontSize="sm" fontWeight="medium">
                Share to web
              </Text>
              <Text color="subtext" fontSize="x-small">
                {isPublic
                  ? 'Anyone with the link can view'
                  : 'Publish and share profile with anyone'}
              </Text>
            </VStack>
            <Switch isChecked={isPublic} onChange={handleTogglePublicProfile} />
          </HStack>

          {/* Custom url key */}
          <Collapse in={isPublic}>
            <Box px={4} pt={4} pb={2}>
              <Form onSubmit={handleSubmit(onSubmit)}>
                <FormControl isInvalid={!!errors.key}>
                  <InputGroup size="sm">
                    <InputLeftAddon
                      rounded="md"
                      px={2}
                      fontSize="xs"
                      children={truncatedHost + '/'}
                    />
                    <Input
                      px={2}
                      pr="50px"
                      rounded="md"
                      {...register('key', {
                        value: initialKey,
                        required: true,
                        pattern: {
                          value: /^[a-z0-9-_]+$/,
                          message: 'a-z, 0-9, -, _ only',
                        },
                      })}
                    />
                    <InputRightElement w="82px" px={1}>
                      <HStack spacing={1}>
                        <Button
                          size="xs"
                          px={2}
                          rounded="4px"
                          type="submit"
                          isLoading={isLoading}
                          isDisabled={!isValid}
                        >
                          Save
                        </Button>
                        <Tooltip
                          fontSize="sm"
                          label="Copy profile link"
                          rounded="lg"
                          hasArrow
                        >
                          <IconButton
                            aria-label="Copy link button"
                            icon={<Icon fontSize="sm" as={BsLink45Deg} />}
                            size="xs"
                            px={2}
                            colorScheme={hasCopied ? 'gray' : 'primary'}
                            rounded="4px"
                            onClick={onCopy}
                          />
                        </Tooltip>
                      </HStack>
                    </InputRightElement>
                  </InputGroup>
                  {errors.key?.message && (
                    <FormErrorMessage fontSize="xs">
                      {errors.key.message}
                    </FormErrorMessage>
                  )}
                </FormControl>
              </Form>
            </Box>
          </Collapse>

          <Divider my={2} />

          <Box mx={4} py={2}>
            <ColorPicker
              value={colorScheme}
              onChange={handleUpdateColorScheme}
            />
          </Box>

          <Divider my={2} />

          <Button
            leftIcon={<Icon fontSize="lg" as={BiLogOutCircle} />}
            rounded="none"
            variant="ghost"
            colorScheme="red"
            size="sm"
            py={3}
            maxH="auto"
            h="auto"
            onClick={handleSignOut}
            _focus={{ shadow: 'none' }}
            isFullWidth
          >
            <Text flex={1} textAlign="left" pl={1}>
              Logout
            </Text>
          </Button>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default memo(UserProfileMenu);
