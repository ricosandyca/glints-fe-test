import { Box, BoxProps, VStack } from '@chakra-ui/react';
import { FC, memo } from 'react';
import { useRecoilValue } from 'recoil';

import { publicUserState } from '~/store/user';
import WorkExperienceItem from './WorkExperienceItem';

const WorkExperienceList: FC<BoxProps> = (props) => {
  const user = useRecoilValue(publicUserState)!;
  const workExperiences = user.work_experiences;

  return (
    <Box position="relative" {...props}>
      {/* Items */}
      <VStack w="full" align="flex-start" spacing={0}>
        {workExperiences.map((we, i) => (
          <WorkExperienceItem
            key={we.id}
            workExperienceId={we.id}
            isLastItem={i === workExperiences.length - 1}
          />
        ))}
      </VStack>
    </Box>
  );
};

export default memo(WorkExperienceList);
