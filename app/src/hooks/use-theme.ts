import { useColorModeValue } from '@chakra-ui/react';

export function useCustomTheme(colorScheme?: string) {
  const bgColor = useColorModeValue(
    `${colorScheme ?? 'primary'}.500`,
    `${colorScheme ?? 'primary'}.200`,
  );
  return { bgColor };
}
