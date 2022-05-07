import {
  Popover,
  PopoverTrigger as OrigPopoverTrigger,
  PopoverBody,
  PopoverContent,
  useDisclosure,
  Box,
} from '@chakra-ui/react';
import { FC, memo, ReactNode, useCallback } from 'react';
import DatePicker from 'react-datepicker';

export const PopoverTrigger: React.FC<{ children: React.ReactNode }> =
  OrigPopoverTrigger;

export type DateInputProps = {
  selectedDate?: Date;
  onSubmit?: (newDate: Date) => any;
  children: ReactNode;
};

const DateInput: FC<DateInputProps> = ({
  selectedDate,
  onSubmit,
  children,
}) => {
  const { isOpen, onClose, onOpen } = useDisclosure({ defaultIsOpen: false });

  // close popover on date changed
  const handleSubmit = useCallback(
    (date: Date) => {
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
            />
          </Box>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default memo(DateInput);
