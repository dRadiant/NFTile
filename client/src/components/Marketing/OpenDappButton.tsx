import { Button, useColorMode } from '@chakra-ui/react';

export const OpenDappButton = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const isDark = colorMode === 'dark';
  return (
    <Button
      as={'a'}
      display={{ base: 'none', md: 'inline-flex' }}
      fontSize={'sm'}
      fontWeight={600}
      colorScheme='purple'
      href={'app'}
    >
      Open dApp
    </Button>
  );
};
