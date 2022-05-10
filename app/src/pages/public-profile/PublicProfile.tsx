import {
  Box,
  BoxProps,
  Center,
  Heading,
  HStack,
  Icon,
  Image,
  Text,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react';
import { FC, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { AiOutlineUser } from 'react-icons/ai';
import { FaBirthdayCake } from 'react-icons/fa';
import { MdOutlineWorkOutline } from 'react-icons/md';
import { useRecoilValue } from 'recoil';

import { withContainer } from '~/hoc/with-container';
import { useFileURLFetcher } from '~/hooks/use-file-upload';
import { usePubliUserFetcher } from '~/hooks/use-public-user';
import Loading from '~/pages/loading';
import NotFound from '~/pages/not-found';
import { publicUserState } from '~/store/user';
import { differenceInCalendarYears } from 'date-fns';
import WorkExperienceList from '~/components/WorkExperienceList';

const PublicProfile: FC = () => {
  const { userKey } = useParams();
  const { publicUser, isLoading } = usePubliUserFetcher(userKey!);

  if (isLoading) return <Loading />;
  if (!publicUser) return <NotFound />;

  return (
    <Box position="relative" w="full">
      {/* Accent background */}
      <Box
        zIndex={1}
        w="full"
        h={{ base: '200px', md: '250px', lg: '300px' }}
        bg="primary"
      />

      {/* Main card */}
      <PublicProfileContent zIndex={2} />
    </Box>
  );
};

const PublicProfileContent: FC<BoxProps> = withContainer((props) => {
  const user = useRecoilValue(publicUserState)!;
  const avatarBg = useColorModeValue('gray.200', 'gray.600');
  // fetch profile image
  const { downloadURL } = useFileURLFetcher(user.profile_picture);

  const latestWork = useMemo(() => {
    return user.work_experiences[0];
  }, [user]);

  return (
    <Box position="relative" top="-100px" {...props}>
      <VStack w="full" align="flex-start" maxW="800px" spacing={4}>
        {/* Profile picture */}
        <Box
          w={{ base: '150px', md: '200px' }}
          h={{ base: '150px', md: '200px' }}
          bg="bg"
          borderColor="bg"
          borderWidth="6px"
          rounded="lg"
          position="relative"
          left="-7px"
          top="-7px"
        >
          {downloadURL ? (
            <Image
              alt="User image"
              src={downloadURL}
              w="full"
              h="full"
              objectFit="cover"
              rounded="md"
            />
          ) : (
            <Center h="full" w="full" bg={avatarBg} rounded="md">
              <Icon as={AiOutlineUser} fontSize="8xl" />
            </Center>
          )}
        </Box>

        {/* User basic info */}
        <VStack w="full" align="flex-start">
          <Heading fontSize="3xl">{user.name}</Heading>

          <HStack color="muted" spacing={4} fontSize="sm">
            {/* Key */}
            <Text>{`@${user.key}`}</Text>

            {/* Latest workd */}
            {latestWork?.job_title && (
              <HStack spacing={1}>
                <Icon as={MdOutlineWorkOutline} />
                <Text>{latestWork.job_title}</Text>
              </HStack>
            )}

            {/* Age */}
            {user.date_of_birth && (
              <HStack spacing={1}>
                <Icon as={FaBirthdayCake} />
                <Text>
                  {`${differenceInCalendarYears(
                    new Date(),
                    user.date_of_birth.toDate(),
                  )} years old`}
                </Text>
              </HStack>
            )}
          </HStack>
        </VStack>

        {/* Professional summary */}
        <Text color="subtext" fontSize={{ base: 'md', md: 'lg' }}>
          {user.summary}
        </Text>

        {/* Work experiences */}
        {user.work_experiences.length > 0 && (
          <VStack w="full" align="flex-start" spacing={6} pt={6}>
            <Heading
              fontSize="sm"
              fontWeight="semibold"
              textTransform="uppercase"
              color="subtext"
            >
              Work Experiences
            </Heading>

            <WorkExperienceList />
          </VStack>
        )}
      </VStack>
    </Box>
  );
});

export default PublicProfile;
