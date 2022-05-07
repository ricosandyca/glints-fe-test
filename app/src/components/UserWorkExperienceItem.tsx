import {
  Box,
  Button,
  Center,
  Editable,
  EditableInput,
  EditablePreview,
  EditableTextarea,
  HStack,
  Icon,
  IconButton,
  Text,
  Tooltip,
  VStack,
} from '@chakra-ui/react';
import { format, formatDistanceStrict } from 'date-fns';
import { Timestamp } from 'firebase/firestore';
import { FC, memo } from 'react';
import { AiOutlineDelete } from 'react-icons/ai';

import DateInput from '~/components/DateInput';
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
  const { handleUpdateWorkExperience, handleDeleteWorkExperience } =
    useUserWorkExperiencesUpdateAction();
  const [jobTitle, setJobTitle] = useDependentState(workExperience.job_title);
  const [jobDesc, setJobDesc] = useDependentState(
    workExperience.job_description,
  );
  const [company, setCompany] = useDependentState(workExperience.company);
  const startDate = workExperience.start_date.toDate();
  const endDate = workExperience.end_date?.toDate();

  return (
    <Box position="relative" w="full" pb={10}>
      {/* Dot divider */}
      <VStack position="absolute" h="full" top={3} left={0} spacing={0}>
        <Box w="10px" h="10px" bg="primary" rounded="full" />
        <Center
          flex={1}
          borderLeftWidth="2px"
          borderStyle="dashed"
          hidden={isLastItem}
        />
      </VStack>

      {/* Main content */}
      <VStack align="flex-start" pl="calc(1rem + 10px)" spacing={1} w="full">
        <HStack w="full">
          {/* Job title */}
          <Editable
            fontSize="lg"
            fontWeight="medium"
            value={jobTitle}
            onChange={setJobTitle}
            onSubmit={(value) =>
              handleUpdateWorkExperience(workExperience.id, {
                job_title: value,
              })
            }
            placeholder="Job title..."
            w="full"
          >
            <EditablePreview py={0} opacity={!jobTitle ? 0.3 : 1} />
            <EditableInput py={0} rounded="sm" />
          </Editable>

          {/* Delete button */}
          <Tooltip
            label="Delete work experience"
            rounded="lg"
            placement="left"
            hasArrow
          >
            <IconButton
              aria-label="Delete work button"
              size="sm"
              colorScheme="red"
              variant="ghost"
              rounded="full"
              icon={<Icon fontSize="md" as={AiOutlineDelete} />}
              onClick={() => handleDeleteWorkExperience(workExperience.id)}
            />
          </Tooltip>
        </HStack>

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

        {/* Job start and end dates */}
        <HStack fontSize="xs" color="subtext" py={1} spacing={1}>
          {/* Start date */}
          <DateInput
            maxDate={new Date()}
            selectedDate={startDate}
            onSubmit={(date) =>
              handleUpdateWorkExperience(workExperience.id, {
                start_date: Timestamp.fromDate(date!),
              })
            }
          >
            <Button
              variant="link"
              size="xs"
              fontWeight="normal"
              color="subtext"
              _focus={{ shadow: 'none' }}
            >
              {format(startDate, 'dd MMMM yyyy')}
            </Button>
          </DateInput>

          <Text children="-" />

          {/* End date */}
          <DateInput
            minDate={startDate}
            cleanupLabel="I currently work here"
            selectedDate={endDate}
            onSubmit={(date) =>
              handleUpdateWorkExperience(workExperience.id, {
                end_date: date ? Timestamp.fromDate(date) : (null as any),
              })
            }
          >
            <Button
              variant="link"
              size="xs"
              fontWeight="normal"
              color="subtext"
              _focus={{ shadow: 'none' }}
            >
              {endDate ? format(endDate, 'dd MMMM yyyy') : 'Present'}
            </Button>
          </DateInput>

          {/* Distance */}
          <Text color="primary">
            ({formatDistanceStrict(endDate ?? new Date(), startDate)})
          </Text>
        </HStack>

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
