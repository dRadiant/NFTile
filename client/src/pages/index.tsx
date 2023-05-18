import {
  Link as ChakraLink,
  Text,
  Code,
  List,
  ListIcon,
  ListItem,
} from '@chakra-ui/react';
import { CheckCircleIcon, LinkIcon } from '@chakra-ui/icons';

import { Container } from '../components/Container';
import { Main } from '../components/Main';
import { DarkModeSwitch } from '../components/DarkModeSwitch';
import { CTA } from '../components/CTA';
import { Footer } from '../components/Footer';
import { MarketingHeader } from '../components/Marketing/MarketingHeader';
import { MarketingCTA } from '../components/Marketing/MarketingCTA';

const Index = () => (
  <>
    <MarketingHeader />
    <Container>
      <MarketingCTA />
    </Container>
  </>
);

export default Index;
