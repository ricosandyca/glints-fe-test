import { Box } from '@chakra-ui/react';
import { FC, memo } from 'react';

import UserWorkExperienceItem from '~/components/UserWorkExperienceItem';
import { useUserUpdateAction } from '~/hooks/use-user';
import UserWorkExperienceAddItem from './UserWorkExperienceAddItem';

const UserWorkExperienceList: FC = () => {
  const { value: workExperiences } = useUserUpdateAction('work_experiences');

  return (
    <Box position="relative" w="full">
      {(workExperiences || []).map((we) => (
        <UserWorkExperienceItem key={we.id} workExperience={we} />
      ))}

      {/* Add work experience */}
      <UserWorkExperienceAddItem
        isListEmpty={!workExperiences || workExperiences.length <= 0}
      />
    </Box>
  );
};

export default memo(UserWorkExperienceList);
