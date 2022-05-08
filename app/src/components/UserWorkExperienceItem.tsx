import {
  Box,
  Button,
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
import { Draggable } from 'react-beautiful-dnd';
import { AiOutlineDelete } from 'react-icons/ai';
import { MdDragIndicator } from 'react-icons/md';

import DateInput from '~/components/DateInput';
import useDependentState from '~/hooks/use-dependent-state';
import {
  useUserCompanyLogoUploadAction,
  useUserWorkExperiencesUpdateAction,
} from '~/hooks/use-user';
import ImageInput from './ImageInput';

export type UserWorkExperienceItemProps = {
  workExperienceId: string;
  index: number;
};

const UserWorkExperienceItem: FC<UserWorkExperienceItemProps> = ({
  workExperienceId,
  index,
}) => {
  return (
    <Draggable draggableId={workExperienceId} index={index}>
      {(provided, snapshot) => (
        <Box
          ref={provided.innerRef}
          position="relative"
          w="full"
          pb={8}
          _hover={{ '.drag-indicator': { opacity: 1 } }}
          {...provided.draggableProps}
        >
          {/* Drag item hot zone */}
          <Box
            className="drag-indicator"
            opacity={snapshot.isDragging ? 1 : 0}
            transitionDuration=".2s"
            position="absolute"
            top="6px"
            p={2}
            left={-7}
            {...provided.dragHandleProps}
          >
            {/* Drag icon */}
            <Icon fontSize="sm" as={MdDragIndicator} />
          </Box>

          {/* Dot */}
          <Box
            position="absolute"
            zIndex={5}
            top="20px"
            left={0}
            h="10px"
            w="10px"
            bg="primary"
            rounded="full"
          />

          {/* Main content */}
          <MemoizedUserWorkExperienceItemContent
            workExperienceId={workExperienceId}
          />
        </Box>
      )}
    </Draggable>
  );
};

export type UserWorkExperienceItemContentProps = {
  workExperienceId: string;
};

export const UserWorkExperienceItemContent: FC<
  UserWorkExperienceItemContentProps
> = ({ workExperienceId }) => {
  const {
    workExperience,
    handleUpdateWorkExperience,
    handleDeleteWorkExperience,
  } = useUserWorkExperiencesUpdateAction(workExperienceId);
  const [jobTitle, setJobTitle] = useDependentState(workExperience!.job_title);
  const [jobDesc, setJobDesc] = useDependentState(
    workExperience!.job_description,
  );
  const [company, setCompany] = useDependentState(workExperience!.company);
  const startDate = workExperience!.start_date.toDate();
  const endDate = workExperience!.end_date?.toDate();
  const { handleUploadCompanyLogo, isLoading, percentage, downloadURL } =
    useUserCompanyLogoUploadAction(workExperienceId);

  return (
    <VStack
      ml="1rem"
      pl="10px"
      w="full"
      bg="fg"
      py={2}
      align="flex-start"
      spacing={1}
    >
      <HStack w="full" spacing={3}>
        {/* Company logo */}
        <ImageInput
          onFileUpload={handleUploadCompanyLogo}
          isUploading={isLoading}
          uploadPercentage={percentage}
          previewImageURL={downloadURL}
          fontSize="2xl"
          h="74px"
          w="74px"
          rounded="none"
        />

        <VStack flex={1} w="full" align="flex-start" spacing={0.5}>
          <HStack w="full">
            {/* Job title */}
            <Editable
              fontSize="lg"
              fontWeight="medium"
              value={jobTitle}
              onChange={setJobTitle}
              onSubmit={(value) =>
                handleUpdateWorkExperience({
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
                onClick={() => handleDeleteWorkExperience()}
              />
            </Tooltip>
          </HStack>

          {/* Company name */}
          <Editable
            fontSize="sm"
            value={company}
            onChange={setCompany}
            onSubmit={(value) =>
              handleUpdateWorkExperience({
                company: value,
              })
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
                handleUpdateWorkExperience({
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
                handleUpdateWorkExperience({
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
        </VStack>
      </HStack>

      {/* Job description */}
      <Editable
        color="subtext"
        value={jobDesc}
        onChange={setJobDesc}
        onSubmit={(value) =>
          handleUpdateWorkExperience({
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
  );
};

export const MemoizedUserWorkExperienceItemContent = memo(
  UserWorkExperienceItemContent,
);

export default memo(UserWorkExperienceItem);
