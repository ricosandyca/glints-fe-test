import { Editable, EditablePreview, EditableTextarea } from '@chakra-ui/react';
import { FC, memo } from 'react';

import useDependentState from '~/hooks/use-dependent-state';
import { useUserUpdateAction } from '~/hooks/use-user';

const UserSummaryInput: FC = () => {
  const { value, handleUpdateValue } = useUserUpdateAction('summary');
  const [summary, setSummary] = useDependentState(value);

  return (
    <Editable
      value={summary}
      onChange={setSummary}
      onSubmit={handleUpdateValue}
      placeholder="Your professional summary..."
      w="full"
    >
      <EditablePreview opacity={!summary ? 0.3 : 1} />
      <EditableTextarea borderRadius="4px" h="145px" />
    </Editable>
  );
};

export default memo(UserSummaryInput);
