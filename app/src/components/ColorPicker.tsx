import {
  Icon,
  IconButton,
  SimpleGrid,
  SimpleGridProps,
} from '@chakra-ui/react';
import colors from '@chakra-ui/theme/foundations/colors';
import { FC, memo, useEffect } from 'react';
import { BiCheck } from 'react-icons/bi';
import useDependentState from '~/hooks/use-dependent-state';

export type ColorSchemePickerProps = Omit<SimpleGridProps, 'onChange'> & {
  colors?: (keyof typeof colors)[];
  value?: keyof typeof colors;
  onChange?: (newValue: keyof typeof colors) => any;
};

export const defaultColors: ColorSchemePickerProps['colors'] = [
  'gray',
  'red',
  'orange',
  'yellow',
  'green',
  'teal',
  'blue',
  'cyan',
  'purple',
  'pink',
  'linkedin',
  'facebook',
  'messenger',
  'whatsapp',
  // 'twitter',
  // 'telegram',
];

const ColorSchemePicker: FC<ColorSchemePickerProps> = ({
  colors,
  value,
  onChange,
  ...simpleGridProps
}) => {
  const [selectedColor, setSelectedColor] = useDependentState(
    value ?? defaultColors[0],
  );
  colors = colors ?? defaultColors;

  useEffect(() => {
    onChange && onChange(selectedColor);
  }, [selectedColor, onChange]);

  return (
    <SimpleGrid gap={2.5} columns={7} {...simpleGridProps}>
      {colors.map((color, i) => (
        <IconButton
          key={i}
          aria-label="Color"
          position="relative"
          borderRadius="md"
          w="33px"
          h="33px"
          minW="0"
          colorScheme={color}
          onClick={() => setSelectedColor(color)}
        >
          {selectedColor === color && <Icon as={BiCheck} fontSize="xl" />}
        </IconButton>
      ))}
    </SimpleGrid>
  );
};

export default memo(ColorSchemePicker);
