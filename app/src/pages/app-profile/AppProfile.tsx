import {
  Box,
  Divider,
  Heading,
  Stack,
  StackProps,
  VStack,
} from '@chakra-ui/react';
import { FC } from 'react';
import { useRecoilValue } from 'recoil';

import OnBoardingAlert from '~/components/OnBoardingAlert';
import UserDateOfBirthInput from '~/components/UserDateOfBirthInput';
import UserNameInput from '~/components/UserNameInput';
import UserProfileMenu from '~/components/UserProfileMenu';
import UserProfilePictureInput from '~/components/UserProfilePictureInput';
import UserSummaryInput from '~/components/UserSummaryInput';
import UserWorkExperienceList from '~/components/UserWorkExperienceList';
import { withContainer } from '~/hoc/with-container';
import { useCustomTheme } from '~/hooks/use-theme';
import { userState } from '~/store/user';

const AppProfile: FC = () => {
  const user = useRecoilValue(userState);
  const { bgColor } = useCustomTheme(user?.color_scheme);

  if (!user) return null;

  return (
    <Box position="relative" w="full">
      {/* Accent background */}
      <Box position="absolute" zIndex={1} w="full" h="400px" bg={bgColor} />

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
  return (
    <VStack position="relative" w="full" spacing={6} {...props}>
      {/* Main card */}
      <Box
        w="full"
        bg="fg"
        rounded="xl"
        shadow="md"
        p={{ base: 6, md: 8, lg: 10 }}
      >
        <OnBoardingAlert mb={6} />

        <Box position="relative">
          {/* User menu */}
          <UserProfileMenu position="absolute" top={0} right={0} />

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

            <VStack w="full" flex={1} spacing={8} align="flex-start">
              {/* Basic info input */}
              <VStack
                maxW="700px"
                w="full"
                alignSelf="flex-start"
                spacing={6}
                flex={1}
              >
                <UserNameInput />
                <UserDateOfBirthInput />
                <UserSummaryInput />
              </VStack>

              <Divider />

              {/* Work experiences */}
              <VStack
                maxW="700px"
                w="full"
                align="flex-start"
                spacing={4}
                pb={6}
              >
                <Heading
                  fontSize="sm"
                  fontWeight="semibold"
                  textTransform="uppercase"
                  color="subtext"
                >
                  Work Experiences
                </Heading>
                <UserWorkExperienceList />
              </VStack>
            </VStack>
          </Stack>
        </Box>
      </Box>
    </VStack>
  );
});

export default AppProfile;
