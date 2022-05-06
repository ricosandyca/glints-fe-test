import { Center, CenterProps, Spinner } from '@chakra-ui/react';
import { FC } from 'react';

const Loading: FC<CenterProps> = (props) => {
  return (
    <Center h="100vh" w="100vw" {...props}>
      <Spinner size="lg" color="primary" />
    </Center>
  );
};

export default Loading;
