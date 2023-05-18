import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';

const name = 'Mock NFT';
const symbol = 'MNFT';
const baseTokenURI = 'ipfs://';

const func: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
  const { deployments, getNamedAccounts } = hre;
  const { deploy } = deployments;

  const { deployer } = await getNamedAccounts();

  await deploy('MockNFT', {
    from: deployer,
    args: [name, symbol, baseTokenURI],
  });
};

export default func;
func.tags = ['MockNFT'];
