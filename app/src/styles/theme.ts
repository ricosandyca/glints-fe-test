import { extendTheme } from '@chakra-ui/react';
import colors from '@chakra-ui/theme/foundations/colors';
import '@fontsource/inter/100.css';
import '@fontsource/inter/200.css';
import '@fontsource/inter/300.css';
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter/700.css';
import '@fontsource/inter/800.css';
import '@fontsource/inter/900.css';
import '@fontsource/poppins/100.css';
import '@fontsource/poppins/200.css';
import '@fontsource/poppins/300.css';
import '@fontsource/poppins/400.css';
import '@fontsource/poppins/500.css';
import '@fontsource/poppins/600.css';
import '@fontsource/poppins/700.css';
import '@fontsource/poppins/800.css';
import '@fontsource/poppins/900.css';
import 'react-datepicker/dist/react-datepicker.css';

export default extendTheme({
  config: { initialColorMode: 'light' },
  styles: {
    global: () => ({
      body: {
        color: 'text',
        bg: 'bg',
      },
    }),
  },
  fonts: {
    heading: "Poppins, 'sans-serif'",
    body: "Inter, 'sans-serif'",
  },
  colors: {
    primary: colors.blue,
  },
  semanticTokens: {
    colors: {
      primary: {
        default: 'primary.500',
        _dark: 'primary.200',
      },
      bg: {
        default: 'white',
        _dark: 'gray.900',
      },
      fg: {
        default: 'white',
        _dark: 'gray.800',
      },
      text: {
        default: 'gray.700',
        _dark: 'gray.100',
      },
      subtext: {
        default: 'gray.600',
        _dark: 'gray.300',
      },
      muted: {
        default: 'gray.400',
        _dark: 'gray.500',
      },
    },
  },
  components: {
    Popover: {
      baseStyle: () => ({
        content: {
          _focus: {
            boxShadow: 'none',
          },
        },
      }),
    },
  },
});
