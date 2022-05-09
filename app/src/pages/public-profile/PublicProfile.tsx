import { Box, StackProps, VStack } from '@chakra-ui/react';
import { FC } from 'react';
import { useParams } from 'react-router-dom';

import { withContainer } from '~/hoc/with-container';
import { usePubliUserFetcher } from '~/hooks/use-public-user';

const PublicProfile: FC = () => {
  const { userKey } = useParams();
  const { publicUser } = usePubliUserFetcher(userKey!);

  console.log(publicUser);

  return (
    <Box position="relative" w="full">
      {/* Accent background */}
      <Box position="absolute" zIndex={1} w="full" h="400px" bg="primary" />

      {/* Main card */}
      <PublicProfileContent
        position="relative"
        zIndex={2}
        py={{ base: 6, lg: 20 }}
      />
    </Box>
  );
};

const PublicProfileContent: FC<StackProps> = withContainer((props) => {
  return (
    <VStack position="relative" w="full" spacing={6} {...props}>
      {/* Main card */}
      <Box
        w="full"
        bg="fg"
        rounded="xl"
        shadow="md"
        p={{ base: 6, md: 8, lg: 10 }}
      >
        Hello world
      </Box>
    </VStack>
  );
});

export default PublicProfile;
