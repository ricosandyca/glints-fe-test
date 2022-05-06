import {
  Icon,
  IconButton,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';
import colors from '@chakra-ui/theme/foundations/colors';
import { ComponentType, FC, useEffect } from 'react';
import { MdDarkMode, MdLightMode } from 'react-icons/md';

export function withFloatingTheme<T>(Content: ComponentType<T>): FC<T> {
  return function FloatingThemeContent(props: T) {
    const { toggleColorMode } = useColorMode();
    const icon = useColorModeValue(MdDarkMode, MdLightMode);
    const metaColor = useColorModeValue(colors.white, colors.gray[800]);

    useEffect(() => {
      // set meta theme color on theme changed
      const metaThemeColor = document.querySelector('meta[name=theme-color]');
      metaThemeColor?.setAttribute('content', metaColor);
    }, [metaColor]);

    return (
      <>
        <Content {...props} />
        <IconButton
          aria-label="Toggle theme"
          variant="solid"
          icon={<Icon as={icon} />}
          position="fixed"
          bottom={6}
          right={6}
          color="bg"
          bg="text"
          onClick={toggleColorMode}
          _hover={{ bg: 'text' }}
          _active={{ bg: 'text' }}
          zIndex={1500}
        />
      </>
    );
  };
}
