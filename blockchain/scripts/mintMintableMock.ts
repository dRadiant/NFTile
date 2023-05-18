import { ethers, deployments, getNamedAccounts } from "hardhat";

/**
 * Deploys new unFacet and links it with deployed unDiamond
 */

const to = "0x6636CFD2130Db2BE544BbaD987982d38bDDBe448";

const main = async () => {  
    const { execute, get } = deployments;

    const { deployer } = await getNamedAccounts();

    // const MNFT = await ethers.getContractAt("MockNFT", (await get('MockNFT')).address);

    for (let i = 0; i < 10; i++) {
        await execute('MockNFT', {from: deployer}, 'mint', to);
    }  
};

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});