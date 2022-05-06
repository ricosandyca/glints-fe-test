import { Box, Button, Icon, StackProps, VStack } from '@chakra-ui/react';
import { FC } from 'react';
import { BiLogOutCircle } from 'react-icons/bi';

import { withContainer } from '~/hoc/with-container';
import { useSignOutAction } from '~/hooks/use-auth';

const AppProfile: FC = () => {
  return (
    <Box position="relative" w="full">
      {/* Accent background */}
      <Box position="absolute" zIndex={1} w="full" h="40%" bg="primary" />

      {/* Main card */}
      <AppProfileContent
        position="relative"
        zIndex={2}
        py={{ base: 6, lg: 20 }}
      />
    </Box>
  );
};

const AppProfileContent: FC<StackProps> = withContainer((props) => {
  const { handleSignOut } = useSignOutAction();

  return (
    <VStack position="relative" w="full" spacing={6} {...props}>
      <Box w="full" bg="fg" rounded="xl" shadow="md" h="600px" p={6}>
        Hello world
      </Box>

      {/* Signout button */}
      <Button
        alignSelf="flex-start"
        size="sm"
        colorScheme="red"
        variant="link"
        fontWeight="500"
        onClick={handleSignOut}
        leftIcon={<Icon as={BiLogOutCircle} />}
      >
        Logout
      </Button>
    </VStack>
  );
});

export default AppProfile;
