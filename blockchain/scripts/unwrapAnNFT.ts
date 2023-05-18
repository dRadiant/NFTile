import { ethers, deployments, getNamedAccounts } from "hardhat";

/**
 * Deploys new unFacet and links it with deployed unDiamond
 */

const to = "0x5391dd1d6dae3678aec9e9470728771d82927795"; // Divisible NFT Contract

const main = async () => {  
    const { execute, get } = deployments;

    const { deployer } = await getNamedAccounts();

    let ABI = ["function unwrap(address to)"];

    let iface = new ethers.utils.Interface(ABI);

    let data = iface.encodeFunctionData("unwrap", [(await get('SimulatedDAOTreasury')).address]);

    await execute('SimulatedDAOTreasury', {from: deployer}, 'submitTransaction', to, ethers.utils.parseUnits("0"), data);
};

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});