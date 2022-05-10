import {
  Box,
  BoxProps,
  Center,
  HStack,
  Icon,
  Image,
  Stack,
  Text,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react';
import { format, formatDistanceStrict } from 'date-fns';
import { FC, memo, useMemo } from 'react';
import { MdOutlineWorkOutline } from 'react-icons/md';
import { useRecoilValue } from 'recoil';

import { useFileURLFetcher } from '~/hooks/use-file-upload';
import { publicUserState } from '~/store/user';

export type WorkExperienceItemProps = BoxProps & {
  workExperienceId: string;
  isLastItem?: boolean;
};

const WorkExperienceItem: FC<WorkExperienceItemProps> = ({
  workExperienceId,
  isLastItem,
  ...boxProps
}) => {
  const user = useRecoilValue(publicUserState)!;

  const we = useMemo(() => {
    return user.work_experiences.find(({ id }) => workExperienceId === id);
  }, [user, workExperienceId]);

  const { downloadURL } = useFileURLFetcher(we?.company_logo);
  const companyBg = useColorModeValue('gray.100', 'gray.700');

  if (!we) return null;

  return (
    <Box position="relative" pb={10} {...boxProps}>
      {/* Dot divider */}
      <VStack spacing={1}>
        <Box
          position="absolute"
          zIndex={5}
          left={0}
          top={2}
          h="10px"
          w="10px"
          bg="primary"
          rounded="full"
        />
        {!isLastItem && (
          <Box
            position="absolute"
            zIndex={2}
            left={1}
            top={2}
            h="full"
            borderLeftWidth="2px"
            borderStyle="dashed"
          />
        )}
      </VStack>

      {/* Content */}
      <VStack ml={8}>
        <Stack
          direction={{ base: 'column', md: 'row' }}
          align={{ base: 'flex-start', md: 'center' }}
          w="full"
          spacing={4}
        >
          <Box
            h={{ base: '46px', md: '66px' }}
            w={{ base: '46px', md: '66px' }}
          >
            {downloadURL ? (
              <Image
                src={downloadURL}
                alt="Company logo"
                w="full"
                h="full"
                objectFit="cover"
              />
            ) : (
              <Center
                color="primary"
                h="full"
                w="full"
                bg={companyBg}
                rounded="md"
              >
                <Icon as={MdOutlineWorkOutline} fontSize="3xl" />
              </Center>
            )}
          </Box>

          <VStack flex={1} w="full" align="flex-start" spacing={0.5}>
            <Text
              fontSize="lg"
              fontWeight="medium"
              color={we.job_title ? 'text' : 'muted'}
            >
              {we.job_title || 'No job title'}
            </Text>
            <Text fontSize="sm" color={we.job_title ? 'text' : 'muted'}>
              {we.company || 'No company name'}
            </Text>
            <HStack fontSize="xs" color="subtext" py={1} spacing={1}>
              <Text color="subtext" fontWeight="normal">
                {format(we.start_date.toDate(), 'dd MMMM yyyy')}
              </Text>

              <Text children="-" />

              <Text color="subtext" fontWeight="normal">
                {we.end_date
                  ? format(we.end_date.toDate(), 'dd MMMM yyyy')
                  : 'Present'}
              </Text>

              <Text color="primary">
                (
                {formatDistanceStrict(
                  we.end_date?.toDate() ?? new Date(),
                  we.start_date.toDate(),
                )}
                )
              </Text>
            </HStack>
          </VStack>
        </Stack>

        {we.job_description && (
          <Text color="subtext" fontSize="15px">
            {we.job_description}
          </Text>
        )}
      </VStack>
    </Box>
  );
};

export default memo(WorkExperienceItem);
