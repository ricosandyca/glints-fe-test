import { FC, ComponentType } from 'react';
import { Container } from '@chakra-ui/react';

export function withContainer<T>(Content: ComponentType<T>): FC<T> {
  return function ContainerContent(props: T) {
    return (
      <Container maxW="container.xl" h="full">
        <Content {...props} />
      </Container>
    );
  };
}
