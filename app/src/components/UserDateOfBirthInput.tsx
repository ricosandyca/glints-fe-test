import { FormControl, FormLabel, HStack, Text } from '@chakra-ui/react';
import { differenceInCalendarYears, format } from 'date-fns';
import { Timestamp } from 'firebase/firestore';
import { FC, memo } from 'react';

import DateInput from '~/components/DateInput';
import { useUserUpdateAction } from '~/hooks/use-user';

const UserDateOfBirthInput: FC = () => {
  const { value, handleUpdateValue } = useUserUpdateAction('date_of_birth');
  const date = value?.toDate();

  return (
    <FormControl alignSelf="flex-start" w="auto">
      <FormLabel mb={0.5} fontSize="xs" color="subtext">
        Date of birth
      </FormLabel>
      <DateInput
        selectedDate={date}
        onSubmit={(date) => handleUpdateValue(Timestamp.fromDate(date))}
      >
        <HStack cursor="pointer" spacing={1}>
          {date ? (
            <>
              <Text fontWeight="semibold">{format(date, 'dd/MM/yyyy')}</Text>
              <Text fontWeight="semibold" color="primary">
                ({differenceInCalendarYears(new Date(), date)} years old)
              </Text>
            </>
          ) : (
            <Text color="subtext">Set your date of birth...</Text>
          )}
        </HStack>
      </DateInput>
    </FormControl>
  );
};

export default memo(UserDateOfBirthInput);
