import { Button } from '@chakra-ui/react';
import { FC } from 'react';

import { useSignOutAction } from '~/hooks/use-auth';

const AppProfile: FC = () => {
  const { handleSignOut } = useSignOutAction();

  return (
    <Button colorScheme="red" onClick={handleSignOut}>
      Sign Out
    </Button>
  );
};

export default AppProfile;
