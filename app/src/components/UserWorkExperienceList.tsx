import { Box } from '@chakra-ui/react';
import { FC, memo } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

import UserWorkExperienceAddItem from '~/components/UserWorkExperienceAddItem';
import UserWorkExperienceItem from '~/components/UserWorkExperienceItem';
import { useDND } from '~/hooks/use-dnd';
import { useUserWorkExperiencesUpdateAction } from '~/hooks/use-user';

const UserWorkExperienceList: FC = () => {
  const { workExperiences, handleReplaceWorkExperiences } =
    useUserWorkExperiencesUpdateAction();
  const { handleDragStart, handleDragEnd } = useDND(
    workExperiences,
    handleReplaceWorkExperiences,
  );

  return (
    <DragDropContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <Droppable droppableId="work-experience-list" direction="vertical">
        {(provided) => (
          <Box
            ref={provided.innerRef}
            position="relative"
            w="full"
            {...provided.droppableProps}
          >
            {/* Divider */}
            <Box
              position="absolute"
              zIndex={2}
              top={5}
              left={1}
              h="calc(100% - 23px)"
              borderLeftWidth="2px"
              borderStyle="dashed"
            />

            {(workExperiences || []).map((we, i) => (
              <UserWorkExperienceItem
                key={we.id}
                workExperienceId={we.id}
                index={i}
              />
            ))}

            {provided.placeholder}

            {/* Add work experience */}
            <UserWorkExperienceAddItem
              isListEmpty={!workExperiences || workExperiences.length <= 0}
            />
          </Box>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default memo(UserWorkExperienceList);
