import { ChakraProvider } from '@chakra-ui/react';
import { FC } from 'react';
import { RecoilRoot } from 'recoil';

import '~/config/firebase';
import Routes from '~/routes';
import theme from '~/styles/theme';

const App: FC = () => {
  return (
    <RecoilRoot>
      <ChakraProvider theme={theme}>
        <Routes />
      </ChakraProvider>
    </RecoilRoot>
  );
};

export default App;
