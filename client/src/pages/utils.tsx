import {
  Link as ChakraLink,
  Text,
  Code,
  List,
  ListIcon,
  ListItem,
  Flex,
  Box,
  Stack,
} from '@chakra-ui/react';
import { CheckCircleIcon, LinkIcon } from '@chakra-ui/icons';

import { Container } from '../components/Container';

import { AppHeader } from '../components/App/AppHeader';

// Import your DAO and User components here
import { DAOInfo } from '../components/App/DAOInfo';
import { UserInfo } from '../components/App/UserInfo';
import { Deposit } from '../components/App/Deposit';
import { MintNFTForm } from '../components/App/MintNFT';

const App = () => (
  <Container height='100vh'>
    <AppHeader />
    <Stack spacing={10}>
      <UserInfo />
      <MintNFTForm />
    </Stack>
  </Container>
);

export default App;
