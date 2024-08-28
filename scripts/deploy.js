const hre = require("hardhat");

async function main() {
    // Get the contract factory for the "Tracking" contract
    const Tracking = await hre.ethers.getContractFactory("Tracking");
    // Deploy the contract
    const tracking = await Tracking.deploy();

    // Wait until the contract is deployed
    await tracking.deployed();

    // Log the address of the deployed contract
    console.log(`Tracking contract deployed to ${tracking.address}`);
}

// Handle errors and exit process
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
