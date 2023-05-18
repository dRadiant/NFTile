import { ConnectButton } from '@rainbow-me/rainbowkit';
import {
  Box,
  Flex,
  Heading,
  Link as ChakraLin,
  Spacer,
  Stack,
  useColorMode,
  IconButton,
  Link,
  Button,
} from '@chakra-ui/react';
import { DarkModeSwitch } from '../DarkModeSwitch';
import { SunIcon, MoonIcon } from '@chakra-ui/icons';

import { DAOMenu } from './DAOMenu';

export const AppHeader = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const isDark = colorMode === 'dark';
  return (
    <Flex
      as='header'
      justifyContent='space-between'
      alignItems='center'
      padding='1rem'
      width='100%'
    >
      <Stack
        direction={{ base: 'column', md: 'row' }}
        alignItems={{ base: 'center', md: 'center' }}
        justifyContent='space-between'
        width='100%'
        spacing={{ base: '4rem', md: 4 }}
      >
        <Box py={{ base: 4, md: 0 }} mr={3}>
          <DAOMenu />
          <Link ml={4} href='utils'>
            <Button aria-label='Toggle Theme' colorScheme='purple'>
              Mint NFT
            </Button>
          </Link>
        </Box>

        <Heading
          as='h1'
          position='fixed'
          left='50%'
          transform='translateX(-50%)'
          zIndex='10'
          py={{ base: 0, md: 0 }}
          cursor="pointer"
        >
          <Link href="app" style={{ textDecoration: 'none' }}>
            🪟 NFTile
          </Link>
        </Heading>
        <Flex gap={4}>
          <ConnectButton />
          <DarkModeSwitch />
        </Flex>
      </Stack>
    </Flex>
  );
};
