import { Editable, EditableInput, EditablePreview } from '@chakra-ui/react';
import { FC, memo } from 'react';

import useDependentState from '~/hooks/use-dependent-state';
import { useUserUpdateAction } from '~/hooks/use-user';

const UserNameInput: FC = () => {
  const { value, handleUpdateValue } = useUserUpdateAction('name');
  const [name, setName] = useDependentState(value);

  return (
    <Editable
      fontSize="2xl"
      fontWeight="semibold"
      fontFamily="heading"
      value={name}
      onChange={setName}
      onSubmit={handleUpdateValue}
      placeholder="Your name..."
      w="full"
    >
      <EditablePreview opacity={!name ? 0.3 : 1} />
      <EditableInput borderRadius="4px" />
    </Editable>
  );
};

export default memo(UserNameInput);
