import { FC } from 'react';
import {
  Flex,
  FlexProps,
  Heading,
  HStack,
  Icon,
  Text,
  useBreakpointValue,
  VStack,
} from '@chakra-ui/react';
import { RiEmotionSadFill } from 'react-icons/ri';

import { withContainer } from '~/hoc/with-container';
import { useDocumentTitle } from '~/hooks/use-document-title';

const NotFound: FC<FlexProps> = (props) => {
  // responsive breakpoints
  const isSMDown = useBreakpointValue({ base: true, md: false });
  const Wrapper = isSMDown ? VStack : HStack;
  useDocumentTitle('Page Not Found');

  return (
    <Flex
      position="relative"
      w="full"
      h="100vh"
      alignItems="center"
      justifyContent="center"
      {...props}
    >
      <Heading
        position="absolute"
        zIndex={0}
        fontWeight="extrabold"
        fontSize={{ base: '9rem', md: '11rem', lg: '18rem' }}
        userSelect="none"
        w="full"
        textAlign="center"
        opacity={0.04}
      >
        404
      </Heading>
      <Wrapper spacing={3} alignItems="center">
        <Icon
          as={RiEmotionSadFill}
          fontSize={{ base: '7xl', md: '8xl' }}
          color="inherit"
        />
        <VStack alignItems={!isSMDown ? 'flex-start' : 'center'} spacing={1}>
          <Text
            fontSize={{ base: 'lg', md: 'xl' }}
            color="inherit"
            fontWeight="semibold"
          >
            Page Not Found
          </Text>
        </VStack>
      </Wrapper>
    </Flex>
  );
};

export default withContainer(NotFound);
