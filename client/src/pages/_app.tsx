import { ChakraProvider } from '@chakra-ui/react';

import theme from '../theme';
import { AppProps } from 'next/app';

import '@rainbow-me/rainbowkit/styles.css';
import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { configureChains, createClient, WagmiConfig } from 'wagmi';
import { mainnet, polygon, optimism, arbitrum, polygonZkEvmTestnet } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';
import { Chain } from 'wagmi';
import dynamic from 'next/dynamic';

import { DaoProvider } from '../context/DAOContext';

const { chains, provider } = configureChains(
  [polygonZkEvmTestnet],
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: 'NFTile',
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

function MyApp({ Component, pageProps }: AppProps) {
  const DynamicComponent = dynamic(() => Promise.resolve(Component), {
    ssr: false,
  });
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <ChakraProvider theme={theme}>
          <DaoProvider>
            <DynamicComponent {...pageProps} />
          </DaoProvider>
        </ChakraProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default MyApp;
