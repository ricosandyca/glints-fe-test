import {
  Box,
  BoxProps,
  Button,
  chakra,
  Collapse,
  Divider,
  FormControl,
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
  useColorModeValue,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import { FC, memo, useMemo } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { BiLogOutCircle } from 'react-icons/bi';
import { BsThreeDots } from 'react-icons/bs';
import { FaGlobeAsia } from 'react-icons/fa';
import truncate from 'smart-truncate';

import { useSignOutAction } from '~/hooks/use-auth';
import { useUserKeyUpdateAction } from '~/hooks/use-user';

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
  const {
    key: initialKey,
    isPublic,
    handleUpdateUserKey,
    handleTogglePublicProfile,
    isLoading,
  } = useUserKeyUpdateAction();
  const btnHoverBg = useColorModeValue('blackAlpha.100', 'whiteAlpha.200');
  const btnActiveBg = useColorModeValue('blackAlpha.50', 'whiteAlpha.50');
  const { isOpen, onClose, onOpen } = useDisclosure({ defaultIsOpen: false });
  const { handleSignOut } = useSignOutAction();

  const truncatedHost = useMemo(() => {
    return truncate(window.location.host, 8, { position: 5 });
  }, []);

  const onSubmit: SubmitHandler<UserProfileMenuInput> = async (data) => {
    const success = await handleUpdateUserKey(data.key);
    if (!success) setError('key', { message: 'Error' });
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
      closeOnBlur
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
          <HStack
            px={4}
            py={3}
            spacing={3}
            w="full"
            justify="flex-start"
            cursor="pointer"
            _hover={{ bg: btnHoverBg }}
            _active={{ bg: btnActiveBg }}
            transitionDuration=".2s"
            onClick={handleTogglePublicProfile}
          >
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
            <Box px={4} py={4}>
              <Form onSubmit={handleSubmit(onSubmit)}>
                <FormControl isInvalid={!!errors.key}>
                  <InputGroup size="sm">
                    <InputLeftAddon
                      rounded="md"
                      px={3}
                      fontSize="xs"
                      children={truncatedHost + '/'}
                    />
                    <Input
                      px={2}
                      pr="50px"
                      rounded="md"
                      {...register('key', {
                        value: initialKey,
                        pattern: /^[a-z0-9-_]+$/i,
                      })}
                    />
                    <InputRightElement w="50px" px={1}>
                      <Button
                        size="xs"
                        px={2}
                        colorScheme="primary"
                        rounded="4px"
                        type="submit"
                        isLoading={isLoading}
                        isDisabled={!isValid}
                      >
                        Save
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </FormControl>
              </Form>
            </Box>
          </Collapse>

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
