// async function main() {
//     const [deployer] = await ethers.getSigners();
//     console.log("Deploying contracts with the account:", deployer.address);

//     const LendingPool = await ethers.getContractFactory("LendingPool");
//     const lendingPool = await LendingPool.deploy();
//     console.log("LendingPool deployed to:", lendingPool.address);
// }

// main()
//     .then(() => process.exit(0))
//     .catch((error) => {
//         console.error(error);
//         process.exit(1);
//     });