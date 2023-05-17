import { HardhatUserConfig } from 'hardhat/config';
import '@nomicfoundation/hardhat-toolbox';
import 'dotenv/config';
import 'hardhat-deploy';

const config: HardhatUserConfig = {
  solidity: {
    version: '0.8.18',
    settings: {
      optimizer: {
        enabled: true,
        runs: 1000,
      },
    },
  },

  namedAccounts: {
    deployer: 0, // Deployer
  },

  networks: {
    zkevmtest: {
      url: `https://rpc.public.zkevm-test.net`, // RPC URL
      accounts:
        process.env.DEPLOYER_PRIVATE_KEY == undefined
          ? []
          : [`0x${process.env.DEPLOYER_PRIVATE_KEY}`],
      saveDeployments: true,
    },
  },
};

export default config;
