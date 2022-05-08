import {
  Alert,
  AlertIcon,
  AlertProps,
  CloseButton,
  Text,
} from '@chakra-ui/react';
import { FC, memo } from 'react';
import { useRecoilState } from 'recoil';

import { showOnBoardingAlert } from '~/store/auth';

const OnBoardingAlert: FC<AlertProps> = (props) => {
  const [showAlert, setShowAlert] = useRecoilState(showOnBoardingAlert);

  if (!showAlert) return null;

  return (
    <Alert
      status="info"
      variant="left-accent"
      fontSize={{ base: 'sm', lg: 'md' }}
      {...props}
    >
      <AlertIcon />
      <Text flex={1} children="You're in edit mode. Click data to edit" />
      <CloseButton
        alignSelf="flex-start"
        size="sm"
        position="relative"
        right={-1}
        onClick={() => setShowAlert(false)}
      />
    </Alert>
  );
};

export default memo(OnBoardingAlert);
