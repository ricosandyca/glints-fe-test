import {
  Box,
  Button,
  Popover,
  PopoverArrow,
  PopoverTrigger as OrigPopoverTrigger,
  PopoverBody,
  PopoverContent,
  useDisclosure,
} from '@chakra-ui/react';
import { FC, memo, ReactNode, useCallback } from 'react';
import DatePicker, { ReactDatePickerProps } from 'react-datepicker';

export const PopoverTrigger: React.FC<{ children: React.ReactNode }> =
  OrigPopoverTrigger;

export type DateInputProps = Partial<ReactDatePickerProps> & {
  selectedDate?: Date;
  onSubmit?: (newDate: Date | null) => any;
  cleanupLabel?: string;
  children: ReactNode;
};

const DateInput: FC<DateInputProps> = ({
  selectedDate,
  onSubmit,
  cleanupLabel,
  children,
  ...datepickerProps
}) => {
  const { isOpen, onClose, onOpen } = useDisclosure({ defaultIsOpen: false });

  // close popover on date changed
  const handleSubmit = useCallback(
    (date?: Date) => {
      onSubmit && onSubmit(date);
      onClose();
    },
    [onSubmit],
  );

  return (
    <Popover
      placement="bottom-start"
      isOpen={isOpen}
      onClose={onClose}
      onOpen={onOpen}
      isLazy
    >
      <PopoverTrigger>{children}</PopoverTrigger>
      <PopoverContent w="auto">
        <PopoverArrow />
        <PopoverBody p={0}>
          <Box
            sx={{
              '.react-datepicker__month-container': {
                float: 'none',
              },
            }}
          >
            <DatePicker
              selected={selectedDate}
              onChange={handleSubmit}
              scrollableYearDropdown
              showYearDropdown
              yearDropdownItemNumber={35}
              inline
              {...datepickerProps}
            />
          </Box>
          {cleanupLabel && (
            <Box p={2}>
              <Button
                size="xs"
                variant="link"
                colorScheme="primary"
                onClick={() => handleSubmit(undefined)}
                fontWeight="medium"
                isFullWidth
              >
                {cleanupLabel}
              </Button>
            </Box>
          )}
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default memo(DateInput);
