import {
  Editable,
  EditablePreview,
  EditableTextarea,
  FormControl,
  FormLabel,
} from '@chakra-ui/react';
import { FC, memo } from 'react';

import useDependentState from '~/hooks/use-dependent-state';
import { useUserUpdateAction } from '~/hooks/use-user';

const UserSummaryInput: FC = () => {
  const { value, handleUpdateValue } = useUserUpdateAction('summary');
  const [summary, setSummary] = useDependentState(value);

  return (
    <FormControl>
      <FormLabel fontSize="xs" color="subtext">
        Professional Summary
      </FormLabel>
      <Editable
        value={summary ?? ''}
        onChange={setSummary}
        onSubmit={handleUpdateValue}
        placeholder="Your professional summary"
        w="full"
      >
        <EditablePreview opacity={!summary ? 0.3 : 1} py={0} />
        <EditableTextarea borderRadius="4px" minH="120px" py={0} />
      </Editable>
    </FormControl>
  );
};

export default memo(UserSummaryInput);
