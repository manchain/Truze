const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  const NewsVerification = await hre.ethers.getContractFactory("NewsVerification");
  const newsVerification = await NewsVerification.deploy();
  
  await newsVerification.deployed();
  
  console.log("NewsVerification deployed to:", newsVerification.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  }); 