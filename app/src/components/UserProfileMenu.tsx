import {
  Box,
  BoxProps,
  Button,
  chakra,
  Collapse,
  Divider,
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
  VStack,
} from '@chakra-ui/react';
import { FC, FormEvent, memo, useCallback, useMemo } from 'react';
import { BsThreeDots } from 'react-icons/bs';
import { FaGlobeAsia } from 'react-icons/fa';
import truncate from 'smart-truncate';

import useDependentState from '~/hooks/use-dependent-state';
import { useUserKeyUpdateAction } from '~/hooks/use-user';

const Form = chakra('form');

// chakra library issue
// @see: https://github.com/chakra-ui/chakra-ui/issues/5896
export const PopoverTrigger: React.FC<{ children: React.ReactNode }> =
  OrigPopoverTrigger;

const UserProfileMenu: FC<BoxProps> = (props) => {
  const {
    key: initialKey,
    isPublic,
    handleUpdateUserKey,
    handleTogglePublicProfile,
    isLoading,
  } = useUserKeyUpdateAction();
  const btnHoverBg = useColorModeValue('blackAlpha.100', 'whiteAlpha.200');
  const btnActiveBg = useColorModeValue('blackAlpha.50', 'whiteAlpha.50');
  const [key, setInputKey] = useDependentState(initialKey);

  const truncatedHost = useMemo(() => {
    return truncate(window.location.host, 8, { position: 5 });
  }, []);

  const handleSubmitKey = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!(await handleUpdateUserKey(key))) setInputKey(initialKey);
    },
    [handleUpdateUserKey, initialKey, key],
  );

  return (
    <Box {...props}>
      <Popover placement="bottom-end" closeOnBlur isLazy>
        <PopoverTrigger>
          <IconButton
            aria-label="Menu button"
            size="sm"
            variant="ghost"
            colorScheme="primary"
            icon={<Icon fontSize="xl" as={BsThreeDots} />}
          />
        </PopoverTrigger>
        <PopoverContent w="400px" _focus={{ shadow: 'none' }}>
          <PopoverBody px={0} py={2}>
            {/* Public toggle button */}
            <HStack
              px={4}
              py={2}
              spacing={3}
              w="full"
              justify="flex-start"
              cursor="pointer"
              _hover={{ bg: btnHoverBg }}
              _active={{ bg: btnActiveBg }}
              onClick={handleTogglePublicProfile}
            >
              <Icon color="subtext" fontSize="3xl" as={FaGlobeAsia} />
              <VStack flex={1} spacing={0.5} align="flex-start">
                <Text fontSize="xs">Share to web</Text>
                <Text color="subtext" fontSize="x-small">
                  {isPublic
                    ? 'Anyone with the link can view'
                    : 'Publish and share profile with anyone'}
                </Text>
              </VStack>
              <Switch
                isChecked={isPublic}
                onChange={handleTogglePublicProfile}
              />
            </HStack>

            {/* Custom url key */}
            <Collapse in={isPublic}>
              <Box px={4} py={4}>
                <Form onSubmit={handleSubmitKey}>
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
                      value={key}
                      onChange={(e) => setInputKey(e.target.value)}
                    />
                    <InputRightElement w="50px" px={1}>
                      <Button
                        size="xs"
                        px={2}
                        colorScheme="primary"
                        rounded="4px"
                        type="submit"
                        isLoading={isLoading}
                      >
                        Save
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </Form>
              </Box>
            </Collapse>

            <Divider />
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </Box>
  );
};

export default memo(UserProfileMenu);
