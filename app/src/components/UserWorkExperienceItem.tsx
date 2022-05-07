import {
  Box,
  Center,
  Editable,
  EditableInput,
  EditablePreview,
  EditableTextarea,
  VStack,
} from '@chakra-ui/react';
import { FC, memo } from 'react';

import useDependentState from '~/hooks/use-dependent-state';
import { useUserWorkExperiencesUpdateAction } from '~/hooks/use-user';
import { UserWorkExperience } from '~/types/user';

export type UserWorkExperienceItemProps = {
  workExperience: UserWorkExperience;
  isLastItem?: boolean;
};

const UserWorkExperienceItem: FC<UserWorkExperienceItemProps> = ({
  workExperience,
  isLastItem,
}) => {
  const { handleUpdateWorkExperience } = useUserWorkExperiencesUpdateAction();
  const [jobTitle, setJobTitle] = useDependentState(workExperience.job_title);
  const [jobDesc, setJobDesc] = useDependentState(
    workExperience.job_description,
  );
  const [company, setCompany] = useDependentState(workExperience.company);

  return (
    <Box position="relative" pb={8}>
      {/* Dot divider */}
      <VStack position="absolute" h="full" top={1.5} left={0} spacing={0}>
        <Box w="10px" h="10px" bg="primary" rounded="full" />
        <Center
          flex={1}
          borderLeftWidth="2px"
          borderStyle="dashed"
          hidden={isLastItem}
        />
      </VStack>

      {/* Main content */}
      <VStack align="flex-start" ml="calc(1rem + 10px)" spacing={1} w="full">
        {/* Job title */}
        <Editable
          fontSize="lg"
          fontWeight="medium"
          value={jobTitle}
          onChange={setJobTitle}
          onSubmit={(value) =>
            handleUpdateWorkExperience(workExperience.id, { job_title: value })
          }
          placeholder="Job title..."
          w="full"
        >
          <EditablePreview py={0} opacity={!jobTitle ? 0.3 : 1} />
          <EditableInput py={0} rounded="sm" />
        </Editable>

        {/* Company name */}
        <Editable
          fontSize="sm"
          value={company}
          onChange={setCompany}
          onSubmit={(value) =>
            handleUpdateWorkExperience(workExperience.id, { company: value })
          }
          placeholder="Company name..."
          w="full"
        >
          <EditablePreview py={0} opacity={!company ? 0.3 : 1} />
          <EditableInput py={0} rounded="sm" />
        </Editable>

        {/* Job description */}
        <Editable
          color="subtext"
          value={jobDesc}
          onChange={setJobDesc}
          onSubmit={(value) =>
            handleUpdateWorkExperience(workExperience.id, {
              job_description: value,
            })
          }
          placeholder="Job description..."
          w="full"
        >
          <EditablePreview py={0} opacity={!jobDesc ? 0.3 : 1} />
          <EditableTextarea py={0} rounded="sm" minH="120px" />
        </Editable>
      </VStack>
    </Box>
  );
};

export default memo(UserWorkExperienceItem);
