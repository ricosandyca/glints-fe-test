import { Box } from '@chakra-ui/react';
import { FC, memo } from 'react';

import UserWorkExperienceItem from '~/components/UserWorkExperienceItem';
import { useUserUpdateAction } from '~/hooks/use-user';

const UserWorkExperienceList: FC = () => {
  const { value: workExperiences } = useUserUpdateAction('work_experiences');

  return (
    <Box position="relative" w="full">
      {workExperiences.map((we, i) => (
        <UserWorkExperienceItem
          key={we.id}
          workExperience={we}
          isLastItem={i === workExperiences.length - 1}
        />
      ))}
    </Box>
  );
};

export default memo(UserWorkExperienceList);
