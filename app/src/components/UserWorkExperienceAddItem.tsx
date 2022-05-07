import { Box, Center, HStack, Icon, IconButton } from '@chakra-ui/react';
import { Timestamp } from 'firebase/firestore';
import { FC, memo } from 'react';
import { HiPlus } from 'react-icons/hi';
import { v4 as uuidv4 } from 'uuid';

import { useUserWorkExperiencesUpdateAction } from '~/hooks/use-user';

const UserWorkExperienceAddItem: FC = () => {
  const { handleAddWorkExperience } = useUserWorkExperiencesUpdateAction();

  return (
    <Box position="relative" pb={8}>
      {/* Dot divider */}
      <HStack position="absolute" h="full" top={-2.5} left={1.5} spacing={0}>
        <Center flex={1} w="22px" borderTopWidth="2px" borderStyle="dashed" />
        <IconButton
          aria-label="Add work experience"
          size="sm"
          variant="outline"
          rounded="full"
          icon={<Icon fontSize="lg" as={HiPlus} opacity={0.5} />}
          onClick={() => {
            handleAddWorkExperience({
              id: uuidv4(),
              company: '',
              job_title: '',
              start_date: Timestamp.fromDate(new Date()),
            });
          }}
        />
      </HStack>
    </Box>
  );
};

export default memo(UserWorkExperienceAddItem);
