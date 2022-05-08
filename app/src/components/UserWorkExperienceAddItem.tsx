import {
  Box,
  Center,
  HStack,
  Icon,
  IconButton,
  Tooltip,
} from '@chakra-ui/react';
import { Timestamp } from 'firebase/firestore';
import { FC, memo } from 'react';
import { HiPlus } from 'react-icons/hi';
import { v4 as uuidv4 } from 'uuid';

import { useUserWorkExperiencesUpdateAction } from '~/hooks/use-user';

export type UserWorkExperienceAddItemProps = {
  isListEmpty?: boolean;
};

const UserWorkExperienceAddItem: FC<UserWorkExperienceAddItemProps> = ({
  isListEmpty,
}) => {
  const { handleAddWorkExperience } = useUserWorkExperiencesUpdateAction();

  return (
    <Box position="relative" pb={6}>
      {/* Dot divider */}
      <HStack
        position="absolute"
        h="full"
        top="8px"
        left={isListEmpty ? 0 : 1.5}
        spacing={0}
      >
        {!isListEmpty && (
          <Center flex={1} w="22px" borderTopWidth="2px" borderStyle="dashed" />
        )}
        <Tooltip
          label="Add work experience"
          rounded="lg"
          placement="right"
          hasArrow
        >
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
        </Tooltip>
      </HStack>
    </Box>
  );
};

export default memo(UserWorkExperienceAddItem);
