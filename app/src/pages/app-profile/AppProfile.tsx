import {
  Box,
  Button,
  Divider,
  Heading,
  Icon,
  Stack,
  StackProps,
  VStack,
} from '@chakra-ui/react';
import { FC } from 'react';
import { BiLogOutCircle } from 'react-icons/bi';
import UserDateOfBirthInput from '~/components/UserDateOfBirthInput';

import UserNameInput from '~/components/UserNameInput';
import UserProfilePictureInput from '~/components/UserProfilePictureInput';
import UserSummaryInput from '~/components/UserSummaryInput';
import UserWorkExperienceList from '~/components/UserWorkExperienceList';
import { withContainer } from '~/hoc/with-container';
import { useSignOutAction } from '~/hooks/use-auth';

const AppProfile: FC = () => {
  return (
    <Box position="relative" w="full">
      {/* Accent background */}
      <Box position="absolute" zIndex={1} w="full" h="400px" bg="primary" />

      {/* Main card */}
      <AppProfileContent
        position="relative"
        zIndex={2}
        py={{ base: 6, lg: 20 }}
      />
    </Box>
  );
};

const AppProfileContent: FC<StackProps> = withContainer((props) => {
  const { handleSignOut } = useSignOutAction();

  return (
    <VStack position="relative" w="full" spacing={6} {...props}>
      <Box
        w="full"
        bg="fg"
        rounded="xl"
        shadow="md"
        p={{ base: 6, md: 8, lg: 10 }}
      >
        <Stack
          direction={{ base: 'column', lg: 'row' }}
          align="center"
          spacing={8}
          w="full"
          mt={{ base: 10, lg: 0 }}
        >
          {/* Profile picture */}
          <UserProfilePictureInput
            alignSelf={{ base: 'center', lg: 'flex-start' }}
            h="200px"
            w="200px"
          />

          <VStack flex={1} spacing={8} align="flex-start">
            {/* Basic info input */}
            <VStack
              maxW="600px"
              w="full"
              alignSelf="flex-start"
              spacing={4}
              flex={1}
            >
              <UserNameInput />
              <UserDateOfBirthInput />
              <UserSummaryInput />
            </VStack>

            <Divider />

            {/* Work experiences */}
            <VStack maxW="600px" w="full" align="flex-start" spacing={4}>
              <Heading fontSize="xl" fontWeight="medium">
                Work Experiences
              </Heading>
              <UserWorkExperienceList />
            </VStack>
          </VStack>
        </Stack>
      </Box>

      {/* Signout button */}
      <Button
        alignSelf="flex-start"
        size="sm"
        colorScheme="red"
        variant="link"
        fontWeight="500"
        onClick={handleSignOut}
        leftIcon={<Icon as={BiLogOutCircle} />}
      >
        Logout
      </Button>
    </VStack>
  );
});

export default AppProfile;
