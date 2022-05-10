import { Box, BoxProps, VStack } from '@chakra-ui/react';
import { FC, memo } from 'react';

import WorkExperienceItem from '~/components/WorkExperienceItem';
import { UserWorkExperience } from '~/types/user';

export type WorkExperienceListProps = BoxProps & {
  workExperiences: UserWorkExperience[];
};

const WorkExperienceList: FC<WorkExperienceListProps> = ({
  workExperiences,
  ...boxProps
}) => {
  return (
    <Box position="relative" {...boxProps}>
      {/* Items */}
      <VStack w="full" align="flex-start" spacing={0}>
        {workExperiences.map((we, i) => (
          <WorkExperienceItem
            key={we.id}
            workExperience={we}
            isLastItem={i === workExperiences.length - 1}
          />
        ))}
      </VStack>
    </Box>
  );
};

export default memo(WorkExperienceList);
