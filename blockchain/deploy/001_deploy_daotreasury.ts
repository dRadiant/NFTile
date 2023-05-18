import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';

const owners: string[] = ["0x6636CFD2130Db2BE544BbaD987982d38bDDBe448", "0x56F2ED2AaEe26a729E91513933B0436c09d17E16", "0x5B1b54B5DbDbA0D77bEd0a8109E92f2EE55C1304"];
const numConfirmationsRequired: number = 2;

const func: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
	const {deployments, getNamedAccounts} = hre;
	const {deploy} = deployments;

	const { deployer } = await getNamedAccounts();

	await deploy('SimulatedDAOTreasury', {
		from: deployer,
		args: [ owners, numConfirmationsRequired ],
	});
};

export default func;
func.tags = ["DAOTreasury"]